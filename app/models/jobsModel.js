const db = require('../database/dbConfig.js')
var crypto = require('crypto')

/**
 * Inserts a job into the database.
 * scheduled_time is an optional field.
 * 
 * @param {"class_id" : integer, 
 *         "scheduled_time" : Date} job 
 */
async function insertJob(job){
    try {
        job["job_hash"] = crypto.createHash('sha1').update((new Date()).valueOf().toString() + Math.random().toString()).digest('hex')
        await db('jobs')
              .insert(job)
    } catch(e){
        console.error("Error: failed to insert job", e)
    }
}

/**
 * Updates scheduled_time for jobs in the database with the same class_id.
 * 
 * @param {"class_id" : integer,
 *         "scheduled_time" : Date} updatedJob 
 */
async function updateJobs(updatedJob){
    try {
        await db('jobs')
              .where({"class_id" : updatedJob.class_id})
              .update({"scheduled_time" : updatedJob.scheduled_time})
    } catch(e){
        console.error("Error: failed to update jobs", e)
    }
}

module.exports = {
    insertJob,
    updateJobs
};