const db = require('../app/database/dbConfig.js');
var MBO = require('mindbody-sdk');
const { insertJob, updateJobs } = require('../app/models/jobsModel.js');
require('dotenv').config();
 
var mbo = new MBO({
    ApiKey: process.env.API_KEY, // from portal
    SiteId: -99 //thisis the sandbox account
});

/**
 * Iterates through provided class information from Mindbody API
 * and updates or inserts jobs to the database
 */
async function processResponse(err,data){
    if (err) {
        console.error("Failed to retrieve information about classes", err);
    } else {
        classes = data.Classes
        for (var i = 0; i < classes.length; i++){
            var session = classes[i]
            scheduledJobs = await db('jobs')
                                  .select('*')
                                  .where({"class_id" : session.Id})
            numberOfJobs = scheduledJobs.length
            var job = {
                "class_id" : session.Id,
                "scheduled_time" : session.StartDateTime,
            }
            if (numberOfJobs === 0){
                await insertJob(job)
            }
            else{
                await updateJobs(job)
            }
        }
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