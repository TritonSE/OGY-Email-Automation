const db = require('../database/dbConfig.js');
const clientProcessing = require('../../utils/clientProcessing.js');

/**
 * Inserts a job into the database.
 * Adds clients who are attending the class.
 *
 * @param jobs
 * @returns {Promise<void>}
 */
async function insert(jobs){
    await jobs.forEach(async function(job){
        try{
            if(job === undefined){
                return;
            }
            await db.transaction(async function(trx) {
                const clients = job.clients;
                const job_entry = {
                    class_id : job.class_id,
                    scheduled_time : job.scheduled_time,
                    status : job.status,
                    job_hash : job.job_hash,
                    class_name : job.class_name,
                    instructor_first_name : job.instructor_first_name,
                    instructor_last_name : job.instructor_last_name
                };
                const job_id = await trx
                    .insert(job_entry, ['id'])
                    .into('jobs');
                await clients.forEach(async function(client) {
                    client.job_id = job_id[0];
                });
                await trx('clients').insert(clients);
            });
        } catch (err) {
            console.error(err, 'Failed to insert job and clients.')
        }
    });
}

/**
 * Updates scheduled_time for jobs in the database with the same class_id.
 * Adds new clients attending the section and removes clients no longer attending
 *
 * @param filter
 * @param updatedJob
 * @returns {Promise<void>}
 */
async function update(filter, job){
    try {
        const clients = job.clients;
        clients.sort(clientProcessing.compareEmails);
        const jobEntry = {
            class_id : job.class_id,
            scheduled_time : job.scheduled_time,
            status : job.status,
            class_name : job.class_name,
            instructor_first_name : job.instructor_first_name,
            instructor_last_name : job.instructor_last_name
        }
        await db('jobs')
              .where(filter)
              .update(jobEntry);
        const jobId = (await get(filter))[0].id;
        const storedClients = await db('clients')
                                    .select('email')
                                    .where('job_id', jobId);
        storedClients.sort(clientProcessing.compareEmails);
        const clientEdits = await clientProcessing.processClients(clients, storedClients, jobId);
        const addClients = clientEdits[0], removeEmails = clientEdits[1];
        await db('clients')
            .where('job_id', jobId)
            .andWhere('email', 'in', removeEmails)
            .del();
        await db('clients')
            .insert(addClients)
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
