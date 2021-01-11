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
        const presentDate = new Date();
        presentDate.setMinutes(presentDate.getMinutes() + 15);
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        await classes.map(async function(class_json){
            const classDate = new Date(class_json.StartDateTime+"Z");
            const filter = {
                "class_id" : class_json.Id,
                "status" : "SCHEDULED"
            };
            const scheduledJobs = await jobsModel.get(filter);
            const jobNotPresent = scheduledJobs.length === 0;
            const job = {
                "class_id" : class_json.Id,
                "scheduled_time" : class_json.StartDateTime,
                "status" : "SCHEDULED"
            };
            const isClassDateInRange = classDate >= presentDate && classDate <= tomorrowDate;
            if (isClassDateInRange){
                if (jobNotPresent){
                    const dateString = (new Date()).valueOf().toString();
                    const randomString = Math.random().toString();
                    const baseString = dateString + randomString;
                    job.job_hash = crypto.createHash('sha1').update(baseString).digest('hex');
                    await jobsModel.insert(job);
                }
                else{
                    await jobsModel.update(filter, job);
                }
            }
        });
    }
}

/**
 * Gets scheduled class information from Mindbody API
 */
async function getJobsinDay(){
    const date = new Date();
    let presentDateString = date.toISOString();
    presentDateString = presentDateString.substring(0, presentDateString.indexOf("."));
    date.setDate(date.getDate() + 1);
    let tomorrowDateString = date.toISOString();
    tomorrowDateString = tomorrowDateString.substring(0, tomorrowDateString.indexOf("."));
    await mbo.class.classes({
        "StartDateTime" : presentDateString,
        "EndDateTime" : tomorrowDateString
    }, processResponse);
}

module.exports = {
    getJobsinDay
};