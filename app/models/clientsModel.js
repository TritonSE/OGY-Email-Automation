const db = require('../database/dbConfig.js');

/**
 * Retrieves the emails of clients who are attending 
 * a class with the specified job id and are email 
 * reminder recipients.
 * 
 * @param {*} jobId Id of the job to retrieve client emails from
 * @returns {Promise<void>}
 */
async function getEmailByJoinJobs(jobId) {
    try {
        const rows = await db('clients')
            .join('jobs', 'jobs.id', 'clients.job_id')
            .select('email')
            .where('job_id', jobId)
            .andWhere('is_recipient', true);
        return await Promise.all(rows.map(async function(client) {
            return client.email;
        }));
    } catch(e){
        console.error("Error: Failed to retrieve client emails by job id.", e);
    }
}

/**
 * Retrieves the clients who are attending 
 * a class with the specified job id.
 * 
 * @param {*} jobId Id of the job to retrieve client from
 * @returns {Promise<void>}
 */
 async function getClientsByJob(jobId) {
    try {
        const rows = await db('clients')
            .select('*')
            .where('job_id', jobId)
        return rows
    } catch(e){
        console.error("Error: Failed to retrieve clients by job id.", e);
    }
}

/**
 * Retrieves the client with the specific id.
 * 
 * @param {*} clientId Id of the client
 * @returns {Promise<void>}
 */
async function getClientById(clientId){
    try {
        client = await db('clients')
            .select('*')
            .where({id: clientId});
        return client[0];
    } catch (e) {
        console.error("Error: Failed to retrieve client by id.");
    }
}

/**
 * Toggles client's notifications given their id.
 * 
 * @param {*} clientId Id of the client
 */
async function toggleIsRecipient(clientId){
    try {
        await db('clients')
            .where({id: clientId})
            .update({ 
                is_recipient : db.raw('NOT ??',  ['is_recipient'])
            });
    } catch(e){
        console.error("Error: Failed to toggle notifications for client.", e)
    }
}

module.exports = {
    getEmailByJoinJobs,
    getClientsByJob,
    getClientById,
    toggleIsRecipient
}