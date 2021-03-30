const schedule = require('node-schedule');
const db = require('../app/database/dbConfig.js');
const jobsModel = require('../app/models/jobsModel.js');
const mailer = require('../modules/mailer.js');

/**
 * Adds scheduled jobs for sending emails by checking for
 * classes starting in 30 min every 15 min using chron job 
 * and jobsModel script. Loop through each class to get clients
 * and then loop through clients to get their emails. Finally,
 * send the email to all clients of each class.
 */
async function scheduleEmail() {
    schedule.scheduleJob('*/15 * * * *', async function() {
        const classes = await jobsModel.getByMinutesFromNow(30);
        classes.forEach(async function(classInfo) {
            const rows = await db('clients')
            .join('jobs', 'jobs.id', 'clients.job_id')
            .select('email')
            .where('job_id', classInfo.id)
            .andWhere('is_recipient', true);
            const emails = await Promise.all(rows.map(async function(client) {
                return client.email;
            }));
            console.log(emails);
            mailer.sendReminders(classInfo, emails);
        });
    });
}

module.exports = {
    scheduleEmail
};