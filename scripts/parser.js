const jobsModel = require('../app/models/jobsModel.js');
const MBO = require('mindbody-sdk');
const crypto = require('crypto');
 
const mbo = new MBO({
    ApiKey: process.env.API_KEY, // from portal
    SiteId: parseInt(process.env.SITE_ID) //thisis the sandbox account
});

/**
 * Iterates through provided class information from Mindbody API
 * and updates or inserts jobs to the database
 */
async function processResponse(err,data){
    if (err) {
        console.error("Failed to retrieve information about classes", err);
    } else {
        const classes = data.Classes;
        await classes.map(async function(class_json) {
            const scheduledJobs = await jobsModel.getById(class_json.Id);
            const jobNotPresent = scheduledJobs.length === 0;
            const job = {
                "class_id" : class_json.Id,
                "scheduled_time" : class_json.StartDateTime,
            };
            if (jobNotPresent){
                const dateString = (new Date()).valueOf().toString();
                const randomString = Math.random().toString();
                const baseString = dateString + randomString;
                job.job_hash = crypto.createHash('sha1').update(baseString).digest('hex');
                await jobsModel.insert(job);
            }
            else{
                await jobsModel.update(job);
            }
        });
    }
}

/**
 * Gets scheduled class information from Mindbody API
 */
async function getJobs15Mins(){
    await mbo.class.classes({}, processResponse);
}

module.exports = {
    getJobs15Mins
};