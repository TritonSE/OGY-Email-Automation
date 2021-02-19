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
                instructor_last_name : classJson.Staff.LastName
            };

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


/**
 * Retrieves the emails of enrolled participants in a specified class
 *
 * @param {integer} id The class id for which to get emails of attendees
 * @param {function} callback Function that processes the provided emails
 */
async function getEnrolledEmails(ClassIds, callback){
    const date = new Date();
    let StartDateTime = date.toISOString();
    StartDateTime = StartDateTime.substring(0, StartDateTime.indexOf("."));
    const EndDateTime = getDateByInterval(7);

    await mbo.class.classes({
        ClassIds,
        StartDateTime,
        EndDateTime
    }, async function(err, data) {
        if (err){
            console.error("Failed to retrieve enrollments for the class", err);
        } else {
            const clients = data.Classes[0]?data.Classes[0].Clients:[];
            const emails = await Promise.all(clients.map(async function(client) {
                return client.Email;
            }));
            await callback(emails);
        }
    });
}

module.exports = {
    getJobsInWeek,
    getEnrolledEmails
};
