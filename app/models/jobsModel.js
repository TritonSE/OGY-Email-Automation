const db = require('../database/dbConfig.js')

/**
 * Inserts a job into the database.
 * scheduled_time is an optional field.
 * 
 * @param {"class_id" : integer, 
 *         "scheduled_time" : Date,
 *         "job_hash" : string} job 
 */
async function insert(job){
    try {
        await db('jobs')
              .insert(job);
    } catch(e){
        console.error("Error: failed to insert job", e);
    }
}

/**
 * Updates scheduled_time for jobs in the database with the same class_id.
 * 
 * @param {"class_id" : integer,
 *         "scheduled_time" : Date} updatedJob 
 */
async function update(updatedJob){
    try {
        await db('jobs')
              .where({"class_id" : updatedJob.class_id})
              .update({"scheduled_time" : updatedJob.scheduled_time});
    } catch(e){
        console.error("Error: failed to update jobs", e);
    }
}

/**
 * Returns a list of jobs with a class_id that matches the id passed
 * in as input.
 */
async function getById(id){
    try {
        jobs = await db('jobs')
                     .select('*')
                     .where({"class_id" : id});
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve jobs", e);
    }
}

module.exports = {
    insert,
    update,
    getById
};