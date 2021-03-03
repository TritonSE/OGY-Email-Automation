
/**
 * Given an array of clients from the MindBody API and an array of client emails
 * from the database associated with a specific job, two arrays are returned. The first
 * being clients from API but not in the database and the second being clients in
 * the database but not from API.
 * 
 * @param {*} apiClients array of clients from api call.
 * @param {*} storedClientsEmails array of emails of clients from database.
 * @param {*} jobId job_id of the class the clients are attending.
 */
async function processClients(apiClients, storedClientsEmails, jobId) {
    const apiClientEmails = await Promise.all(apiClients.map(async function (client) {
        return client.email;
    }));
    const newClients = await apiClients.filter(async function (client) {
        return !storedClientsEmails.includes(client.email);
    });
    await newClients.forEach(async function (client) {
        client.job_id = jobId;
    })
    const emailsToRemove = await storedClientsEmails.filter(async function (email){
        return !apiClientEmails.includes(email);
    });
    return [newClients, emailsToRemove];
}

module.exports = {
    processClients
};