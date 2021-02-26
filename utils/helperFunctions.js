
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
 * Given a list of clients from the MindBody API and a list of clients
 * in the database associated with a specific job, two lists are returned. The first
 * being clients from API but not in the database and the second being clients in
 * the database but not from API.
 * 
 * @param {*} clients 
 * @param {*} storedClients 
 * @param {*} jobId 
 */
async function processClients(clients, storedClients, jobId) {
    let clientIndex = 0, storedClientIndex = 0;
    const addClients = [], removeEmails = [];
    const clientsLength = clients.length, storedClientsLength = storedClients.length;
    while(clientIndex < clientsLength || storedClientIndex < storedClientsLength){
        if(clientIndex == clientsLength){
            for(let i = storedClientIndex; i < storedClientsLength; i++){
                removeEmails.push(storedClients[i].email);
            }
        } else if (storedClientIndex == storedClientsLength){
            for(let i = clientsIndex; i < clientsLength; i++){
                clients[i].job_id = jobId;
                addClients.push(clients[i]);
            }
        } else if (clients[clientIndex].email == storedClients[storedClientIndex].email){
            clientIndex++;
            storedClientIndex++;
        } else if (clients[clientIndex].email > storedClient[storedClientIndex].email){
            removeEmails.push(storedClients[storedClientIndex].email);
            storedClientIndex++;
        } else {
            clients[i].job_id = jobId;
            addEmails.push(clients[clientIndex]);
            clientIndex++;
        }
    }
    return [addClients, removeEmails];
}

module.exports = {
    pick,
    compareEmails,
    processClients
};