const schedule = require('node-schedule');
const jobsModel = require('../app/models/jobsModel.js');
const parser = require('parser.js');

/**
 * Adds scheduled jobs for sending emails by dequeueing a list of classes
 * and creating a new node-scheduled job for each class. Then, using the parser script
 * to get the list of emails for each class, send the email to the receivers.
 */
async function scheduleEmail(receivers, emailInfo, targetTime) {
    const job = schedule.scheduleJob(new Date(targetTime).addHours(8), async function () {
        await mailer.sendEmail(receivers, emailInfo, async function(err, resData) {
            if (err) {
                console.log(err);
            } else {
                return resData;
            }
        });
    });
}