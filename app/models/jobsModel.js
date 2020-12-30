const db = require('../database/dbConfig.js')
const crypto = require('crypto')

/**
 * Inserts a job into the database.
 * scheduled_time is an optional field.
 * 
 * @param {"class_id" : integer, 
 *         "scheduled_time" : Date} job 
 */
async function insertJob(job){
    try {
        const dateString = (new Date()).valueOf().toString()
        const randomString = Math.random().toString()
        const baseString = dateString + randomString
        job.job_hash = crypto.createHash('sha1').update(baseString).digest('hex')
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

/**
 * Returns a list of jobs with a class_id that matches the id passed
 * in as input.
 */
async function getJobsById(id){
    try {
        jobs = await db('jobs')
                     .select('*')
                     .where({"class_id" : id})
        return jobs
    } catch(e){
        console.error("Error: failed to retrieve jobs", e)
    }
}

module.exports = {
    insertJob,
    updateJobs,
    getJobsById
};