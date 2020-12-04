const db = require('../database/dbConfig.js')

/**
 * Inserts a job into the database.
 * scheduled_time is an optional field.
 * 
 * @param {"class_id" : integer, 
 *         "scheduled_time" : DateTime, 
 *         "job_hash" : string} job 
 */
async function insertJob(job){
    try {
        await db('jobs')
        .insert(job)
    }catch(e){
        console.error("Error: failed to insert job", e)
    }
}

module.exports = {
    insertJob
};