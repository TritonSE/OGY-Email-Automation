const db = require('../database/dbConfig.js');
const clientsModel = require('./clientsModel');
const convert = require('../../utils/convert');

/**
 * Inserts jobs into the database.
 * Adds clients who are attending the class.
 *
 * @param jobs
 * @returns {Promise<void>}
 */
async function insert(jobs){
    await jobs.forEach(async function(job){
        if(job === undefined){
            return;
        }
        await db.transaction(async function(trx) {
            try {
                const clients = job.clients;
                const jobEntry = {
                    class_id : job.class_id,
                    class_schedule_id : job.class_schedule_id,
                    scheduled_time : job.scheduled_time,
                    class_end_time : job.class_end_time,
                    status : job.status,
                    job_hash : job.job_hash,
                    class_name : job.class_name,
                    instructor_first_name : job.instructor_first_name,
                    instructor_last_name : job.instructor_last_name
                };
                const jobId = await db('jobs')
                    .insert(jobEntry, ['id'])
                    .transacting(trx);
                await clients.forEach(async function(client) {
                    client.job_id = jobId[0];
                });
                await db('clients')
                    .insert(clients)
                    .transacting(trx);
                await trx.commit();
            } catch (err) {
                console.error(err, 'Failed to insert job and clients.');
                await trx.rollback();
            }
        });
    });
}

/**
 * Updates scheduled_time for jobs in the database with the same class_id.
 * Adds new clients attending the section and removes clients no longer attending
 *
 * @param job the fields retrieved from the api to update the stored job.
 * @param jobId id of the job to be updated
 * @param clientEdits differences in clients between database and api
 * @returns {Promise<void>}
 */
async function update(job, jobId, clientEdits){
    await db.transaction(async function(trx) {
        try {
            const jobEntry = {
                class_id : job.class_id,
                class_schedule_id : job.class_schedule_id,
                scheduled_time : job.scheduled_time,
                class_end_time : job.class_end_time,
                status : job.status,
                class_name : job.class_name,
                instructor_first_name : job.instructor_first_name,
                instructor_last_name : job.instructor_last_name
            }
            await db('jobs')
                  .where({id: jobId})
                  .update(jobEntry)
                  .transacting(trx);
            const addClients = clientEdits[0], removeEmails = clientEdits[1];
            await db('clients')
                .where('job_id', jobId)
                .andWhere('email', 'in', removeEmails)
                .del()
                .transacting(trx);
            await db('clients')
                .insert(addClients)
                .transacting(trx);
            await trx.commit();
        } catch(err){
            console.error("Error: failed to update jobs", err);
            await trx.rollback();
        }
    });
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
 * Get all scheduled jobs
 * 
 * @returns {Promise<*>}
 */
async function getAll(){
    try {
        const result = await db('jobs')
            .select('*');
        const jobs = await Promise.all(result.map(async function(job) {
            job.clients = await clientsModel.getClientsByJob(job.id);
            return ({...job, scheduled_time:convert(job.scheduled_time)});
        }));
        return jobs;
    } catch(e){
        console.error("Error: failed to retrieve jobs", e);
    }
}
/**
 * Returns a list of jobs of the classes that need to be
 * dequeued within a specific time frame.
 *
 * @param minMinutes lower bound of minutes after present time that is included in range
 * @param maxMinutes upper bound of minutes after present time that is included in range
 */
async function getByMinutesInRange(minMinutes, maxMinutes){
    try{
        const minDate = new Date();
        const maxDate = new Date(minDate);
        minDate.setMinutes(minDate.getMinutes() + minMinutes);
        maxDate.setMinutes(maxDate.getMinutes() + maxMinutes);
        const result = await db('jobs')
                                .where('status', 'SCHEDULED')
                                .andWhere('scheduled_time', '>=', minDate)
                                .andWhere('scheduled_time', '<', maxDate)
                                .select('*');
        return result;
    }
    catch(e) {
        console.error("Error: failed to dequeue jobs", e);
    }
}

/**
 * Updates a job given its id.
 * 
 * @param {*} jobId Id of the job to update.
 * @param {*} updates json of the updates to be made to the job.
 */
async function updateById(jobId, updates){
    try {
        await db('jobs')
            .where({id : jobId})
            .update(updates);
    } catch(e){
        console.error("Error: Failed to update the job by id.", e);
    }
}


module.exports = {
    insert,
    update,
    get,
    getByMinutesInRange,
    getAll,
    updateById
};
