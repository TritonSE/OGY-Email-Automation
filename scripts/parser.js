const db = require('../app/database/dbConfig.js');
var MBO = require('mindbody-sdk');
require('dotenv').config();
const { insertJob, updateJob } = require('../app/models/jobsModel.js');
 
var mbo = new MBO({
    ApiKey: process.env.API_KEY, // from portal
    SiteId: -99 //thisis the sandbox account
});

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
            //replace job hash
            var job = {
                "class_id" : session.Id,
                "scheduled_time" : session.StartDateTime,
                "job_hash" : "a"
            }
            if (numberOfJobs === 0){
                await insertJob(job)
            }
            else if (numberOfJobs === 1){
                await updateJob(job)
            }
            else{
                console.error("Error: more than two jobs exist in the table with the same id")
            }
        }
    }
}


async function getJobs15Mins(){
    await mbo.class.classes({}, processResponse)
}

module.exports = {
    getJobs15Mins
};