const db = require('../database/dbConfig.js');

/**
 * Inserts a job into the database. scheduled_time is an optional field.
 *
 * @param job
 * @returns {Promise<void>}
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
 * @param filter
 * @param updatedJob
 * @returns {Promise<void>}
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
 * @param filter
 * @returns {Promise<void>}
 */
async function get(filter){
    try {
        const jobs = await db('jobs')
                     .select('*')
                     .where(filter);
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve jobs", e);
    }
}

/**
 * get all jobs
 * @returns {Promise<*>}
 */
async function getAll(){
    try {
        const jobs = await db('jobs')
            .select('*');
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve jobs", e);
    }
}

/**
 * Returns a list of jobs of the classes that need to be
 * dequeued within a specfic time frame
 *
 * @param time integer specifying time frame
 */
async function getByMinutesFromNow(mins){
    try{
        const presentDate = new Date();
        presentDate.setMinutes(presentDate.getMinutes() + mins);
        const result = await db('jobs')
                                .where('status', 'SCHEDULED')
                                .andWhere('scheduled_time', '<', presentDate)
                                .select('*');
        return result;

    }
    catch(e) {
        console.error("Error: failed to dequeue jobs", e);
    }
}


module.exports = {
    insert,
    update,
    get,
    getByMinutesFromNow,
    getAll
};
