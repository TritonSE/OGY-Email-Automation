const schedule = require('node-schedule');
const jobsModel = require('../app/models/jobsModel.js');
const parser = require('../scripts/parser.js');
const mailer = require('../modules/mailer.js');

/**
 * Adds scheduled jobs for sending emails by checking for
 * classes starting in 15 min every 15 min. Then, using
 * the parser script to get the list of emails for each class,
 * send the email to the emails.
 */
async function scheduleEmail() {
    schedule.scheduleJob('*/15 * * * *', async function() {
        const classArr = jobsModel.getByMinutesFromNow(15);
        classArr.forEach(async function(classInfo) {
            const id = classInfo.class_id;
            parser.getEnrolledEmails(id, mailer.sendReminders);
        });
    });
}

module.exports = {
    scheduleEmail
};

scheduleEmail();