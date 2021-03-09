const jobsModel = require('../app/models/jobsModel.js');
const MBO = require('mindbody-sdk');
const crypto = require('crypto');
const getDateByInterval = require('../utils/getDateByInterval');

const mbo = new MBO({
    ApiKey: process.env.API_KEY, // from portal
    SiteId: parseInt(process.env.SITE_ID) //this is the sandbox account
});

/**
 * Iterates through provided class information from Mindbody API
 * and updates or inserts jobs to the database
 */
async function _parseClasses(err,data){
    if (err) {
        console.error("Failed to retrieve information about classes", err);
    } else {
        const newJobs = await Promise.all(data.Classes.map(async function(classJson){

            // filter for database query
            const filter = {
                class_id : classJson.Id,
                status: "SCHEDULED"
            };

            // job json for update or insert
            const job = {
                class_id : classJson.Id,
                scheduled_time : classJson.StartDateTime,
                status : "SCHEDULED",
                class_name : classJson.ClassDescription.Name,
                instructor_first_name : classJson.Staff.FirstName,
                instructor_last_name : classJson.Staff.LastName,
                class_end_time : classJson.EndDateTime
            };
            const clients = await Promise.all(classJson.Clients.map(async function(client){
                const clientEntry = {
                    first_name : client.FirstName,
                    last_name : client.LastName,
                    email : client.Email,
                    is_recipient : client.SendScheduleEmails
                };
                return clientEntry;
            }));
            job.clients = clients;
            const scheduledJobs = await jobsModel.get(filter);
            const isJobPresent = scheduledJobs.length !== 0;

            // if job doesn't exist in the database, return it into the newJobs array
            if(!isJobPresent) {
                const dateString = (new Date()).valueOf().toString();
                const randomString = Math.random().toString();
                const baseString = dateString + randomString;

                // hash value for the job
                job.job_hash = crypto.createHash('sha1').update(baseString).digest('hex');
                return job;
            }

            // if job already exist, update it
            await jobsModel.update(filter, job);
        }));

        // filter out all the undefined in array
        await jobsModel.insert(newJobs);
    }
}

/**
 * Gets scheduled class information from Mindbody API
 */
async function getJobsInWeek(){

    // set dates for querying range from mindbody api
    const date = new Date();
    let StartDateTime = date.toISOString();
    StartDateTime = StartDateTime.substring(0, StartDateTime.indexOf("."));
    const EndDateTime = getDateByInterval(7);

    await mbo.class.classes({
        StartDateTime,
        EndDateTime
    }, _parseClasses);
}

module.exports = {
    getJobsInWeek,
};
