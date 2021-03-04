
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
async function findClientDifference(apiClients, storedClientsEmails, jobId) {
    const apiClientEmails = await Promise.all(apiClients.map(client => client.email));
    const newClients = await apiClients.filter(client => !storedClientsEmails.includes(client.email));
    await newClients.forEach(client => client.job_id = jobId)
    const emailsToRemove = await storedClientsEmails.filter(email => !apiClientEmails.includes(email));
    return [newClients, emailsToRemove];
}

module.exports = {
    findClientDifference
};