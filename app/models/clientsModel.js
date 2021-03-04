const db = require('../database/dbConfig.js');

/**
 * Retrieves a list of clients who are attending the class with the specified job id 
 * and are email reminder recipients.
 * 
 * @param {*} jobId Id of the job to retrieve clients from
 */
async function getByJobId(jobId) {
    try {
        return await db('clients')
            .select('*')
            .where('job_id', jobId)
            .andWhere('is_recipient', true);
    } catch(e){
        console.error("Error: Failed to retrieve clients by job id.", e);
    }
}

module.exports = {
    getByJobId
}