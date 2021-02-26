
/**
 * Comparator for sorting clients based on their email ids.
 * 
 * @param {*} a 
 * @param {*} b 
 */
function compareEmails(a, b) {
    if (a.email < b.email){
        return -1;
    }
    else if (b.email < a.email){
        return 1;
    }
    return 0;
}

/**
 * Given an array of clients from the MindBody API and an array of clients
 * in the database associated with a specific job, two arrays are returned. The first
 * being clients from API but not in the database and the second being clients in
 * the database but not from API.
 * 
 * @param {*} clients array of clients from api call, sorted by email.
 * @param {*} storedClients array of clients from database, sorted by email.
 * @param {*} jobId job_id of the class the clients are attending.
 */
async function processClients(clients, storedClients, jobId) {
    let clientsIndex = 0, storedClientsIndex = 0;
    // declare initial arrays to store new clients to be added and clients to be removed.
    const addClients = [], removeEmails = [];
    const clientsLength = clients.length, storedClientsLength = storedClients.length;
    // Keep iterating as long as either array hasn't been completely traversed.
    while(clientsIndex < clientsLength || storedClientsIndex < storedClientsLength){
        // if all clients from API call are processed, rest of the clients in database array are no longer
        // attending the class.
        if(clientsIndex == clientsLength){
            for(let i = storedClientsIndex; i < storedClientsLength; i++){
                removeEmails.push(storedClients[i].email);
            }
            break;
        } 
        // if all clients in database are processed, rest of the clients from the api call are new clients
        // registered for the class. 
        else if (storedClientsIndex == storedClientsLength){
            for(let i = clientsIndex; i < clientsLength; i++){
                clients[i].job_id = jobId;
                addClients.push(clients[i]);
            }
            break;
        } 
        // if emails from both arrays are the same, the client is in the database and still registered.
        else if (clients[clientsIndex].email == storedClients[storedClientsIndex].email){
            clientsIndex++;
            storedClientsIndex++;
        } 
        // if email is in database but not from api call, then the client is no longer attending the class.
        else if (clients[clientsIndex].email > storedClients[storedClientsIndex].email){
            removeEmails.push(storedClients[storedClientsIndex].email);
            storedClientsIndex++;
        } 
        // if email is from api call but is not in the database, then the client is newly registered for the class.
        else {
            clients[clientsIndex].job_id = jobId;
            addClients.push(clients[clientsIndex]);
            clientsIndex++;
        }
    }
    // return both arrays of clients to be added and the emails of clients to be removed from the database.
    return [addClients, removeEmails];
}

modules.export = {
    compareEmails,
    processClients
};