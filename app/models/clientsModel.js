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
 * Toggles client's notifications given their id.
 * 
 * @param {*} clientId id of the client
 * @returns {boolean} Whether the client's notifications are on or off.
 */
async function toggleClientNotification(clientId){
    try {
        const clients = await db('clients')
                .select('*')
                .where({id : clientId});
        const client = clients[0];
        await db('clients')
            .where({id: clientId})
            .update({ 
                is_recipient : !client.is_recipient
            });
        return !client.is_recipient;
    } catch(e){
        console.error("Error: Failed to toggle notifications for client.", e)
    }
}

module.exports = {
    getEmailByJoinJobs,
    getClientsByJob,
    toggleClientNotification
}