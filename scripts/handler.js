const schedule = require('node-schedule');
const clientsModel = require('../app/models/clientsModel.js');
const jobsModel = require('../app/models/jobsModel.js');
const mailer = require('../modules/mailer.js');

/**
 * Adds scheduled jobs for sending emails by checking for
 * classes starting in 30 min every 15 min using chron job 
 * and jobsModel script. Loop through each class to get 
 * clients' emails using knex join function. Finally, 
 * send the email to all clients of each class using the 
 * mailer script.
 */
async function scheduleEmail() {
    schedule.scheduleJob('*/15 * * * *', async function() {
        const classes = await jobsModel.getByMinutesInRange(15, 30);
        classes.forEach(async function(classInfo) {
            const emails = await clientsModel.getEmailByJoinJobs(classInfo.id);
            mailer.sendReminders(classInfo, emails);
        });
    });
}

module.exports = {
    scheduleEmail
};