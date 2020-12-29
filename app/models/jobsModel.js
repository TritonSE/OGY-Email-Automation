const db = require('../database/dbConfig.js')

/**
 * Inserts a job into the database.
 * scheduled_time is an optional field.
 * 
 * @param {"class_id" : integer, 
 *         "scheduled_time" : Date, 
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

async function updateJob(newJob){
    jobUpdates = {
        "scheduled_time" : newJob.scheduled_time,
        "job_hash" : newJob.job_hash
    }
    try{
        await db('jobs')
              .where({"class_id" : newJob.class_id})
              .update(jobUpdates)
    }catch(e){
        console.error("Error: failed to update job", e)
    }
}

module.exports = {
    insertJob,
    updateJob
};