const db = require('../database/dbConfig.js');

/**
 * Retrieves the emails of clients who are attending 
 * a class with the specified job id and are email 
 * reminder recipients.
 * 
 * @param {*} classId Id of the job to retrieve client emails from
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

module.exports = {
    getEmailByJoinJobs
}