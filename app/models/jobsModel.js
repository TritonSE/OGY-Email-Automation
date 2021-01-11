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
 *         "status" : enum} filter
 * @param {"class_id" : integer,
 *         "scheduled_time" : Date,
 *         "status" : enum} updatedJob 
 */
async function update(filter, updatedJob){
    try {
        await db('jobs')
              .where(filter)
              .update(updatedJob);
    } catch(e){
        console.error("Error: failed to update jobs", e);
    }
}

/**
 * Returns a list of jobs with a class_id that matches the id passed
 * in as input.
 * 
 * @param {"class_id" : integer,
 *         "status" : enum} filter
 */
async function get(filter){
    try {
        jobs = await db('jobs')
                     .select('*')
                     .where(filter);
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve jobs", e);
    }
}

module.exports = {
    insert,
    update,
    get
};