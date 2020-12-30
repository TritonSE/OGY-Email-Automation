const jobsModel = require('../app/models/jobsModel.js');
const MBO = require('mindbody-sdk');
 
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
        const classes = data.Classes
        await classes.map(async function(class_json) {
            const scheduledJobs = await jobsModel.getJobsById(class_json.Id)
            const numberOfJobs = scheduledJobs.length
            const job = {
                "class_id" : class_json.Id,
                "scheduled_time" : class_json.StartDateTime,
            }
            if (numberOfJobs === 0){
                await jobsModel.insertJob(job)
            }
            else{
                await jobsModel.updateJobs(job)
            }
        });
    }
}

/**
 * Gets scheduled class information from Mindbody API
 */
async function getJobs15Mins(){
    await mbo.class.classes({}, processResponse)
}

module.exports = {
    getJobs15Mins
};