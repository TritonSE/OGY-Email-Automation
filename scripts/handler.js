const schedule = require('node-schedule');
const jobsModel = require('../app/models/jobsModel.js');
const parser = require('parser.js');
const mailer = require('../app/mailer_modules/sendEmail.js');

/**
 * Adds scheduled jobs for sending emails by dequeueing a list of classes
 * and creating a new node-scheduled job for each class. Then, using the parser script
 * to get the list of emails for each class, send the email to the receivers.
 */
async function scheduleEmail() {
    schedule.scheduleJob('*/15 * * * *', function() {
        const classArr = jobsModel.getByMinutesFromNow(15);
        classArr.forEach(async function(classInfo) {
            const id = classInfo.class_id;
            parser.getEnrolledEmails(id, mailer.sendEmails);
        });
    });
}