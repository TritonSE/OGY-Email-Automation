const jobsModel = require('../app/models/jobsModel.js');
const clientsModel = require('../app/models/clientsModel');
const MBO = require('mindbody-sdk');
const crypto = require('crypto');
const clientProcessing = require('../utils/clientProcessing');
const jobProcessing = require('../utils/jobProcessing');
const { DateTime } = require('luxon');

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
        const today = DateTime.local().plus({ minutes: 15 });
        const newJobs = await Promise.all(data.Classes.map((classJson) => {
            classJson.StartDateTime = DateTime.fromISO(classJson.StartDateTime, { 'zone': 'America/Los_Angeles'});
            classJson.EndDateTime = DateTime.fromISO(classJson.EndDateTime, { 'zone': 'America/Los_Angeles'});
            return classJson;
        }).filter(async (classJson) => {
            const deleteFilter = {
                class_id : classJson.Id,
                class_schedule_id : classJson.ClassScheduleId,
                status: "DELETED",
                scheduled_time: classJson.StartDateTime.toSQL({ includeOffset: false }),
                class_end_time: classJson.EndDateTime.toSQL({ includeOffset: false })
            };
            const deletedJobs = await jobsModel.get(deleteFilter);
            return deletedJobs.length === 0 && classJson.StartDateTime >= today;
        }).map(async (classJson) => {
            // filter for database query
            const filter = {
                class_id : classJson.Id,
                class_schedule_id : classJson.ClassScheduleId,
                status: "SCHEDULED"
            };
            // job json for update or insert
            const job = {
                class_id : classJson.Id,
                class_schedule_id : classJson.ClassScheduleId,
                scheduled_time : classJson.StartDateTime.toSQL({ includeOffset: false }),
                status : "SCHEDULED",
                class_name : classJson.ClassDescription.Name,
                instructor_first_name : classJson.Staff.FirstName,
                instructor_last_name : classJson.Staff.LastName,
                class_end_time : classJson.EndDateTime.toSQL({ includeOffset: false })
            };
            const scheduled_time = classJson.StartDateTime.toLocaleString(DateTime.TIME_SIMPLE);
            const class_end_time = classJson.EndDateTime.toLocaleString(DateTime.TIME_SIMPLE);
            job.scheduled_message = "Get ready and get pumped for your upcoming " + job.class_name + " class! It starts at " + scheduled_time + " and ends at " + class_end_time + ". Make sure to join on time and have everything you need to have a successful and worthwhile session. And don't forget to have fun!";
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
            const storedJob = scheduledJobs[0];
            const storedClients = await clientsModel.getClientsByJob(storedJob.id);
            const storedClientsEmails = await Promise.all(storedClients.map(client => client.email));
            const clientDiff = await clientProcessing.findClientDifference(clients, storedClientsEmails, storedJob.id);
            const isJobUpdated = await jobProcessing.isJobUpdated(job, storedJob, clientDiff);
            if(!isJobUpdated){
                await jobsModel.update(job, storedJob.id, clientDiff);
            }
        }));
        await jobsModel.insert(newJobs);
    }
}

/**
 * Gets scheduled class information from Mindbody API
 */
async function getJobsInWeek(){
    // set dates for querying range from mindbody api
    // NOTE: times must be provided in the business owner's timezone without the timezone specified
    const startDate = DateTime.local().setZone("America/Los_Angeles").startOf('second');
    const endDate = startDate.plus({ days: 7 }).startOf('second');
    const StartDateTime = startDate.toISO({ includeOffset: false, suppressMilliseconds: true });
    const EndDateTime = endDate.toISO({ includeOffset: false, suppressMilliseconds: true });
    await mbo.class.classes({
        StartDateTime,
        EndDateTime
    }, _parseClasses);
}

module.exports = {
    getJobsInWeek,
};
