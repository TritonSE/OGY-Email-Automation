const schedule = require('node-schedule');
const jobsModel = require('../app/models/jobsModel.js');
const clientsModel = require('../app/models/clientsModel.js');
const mailer = require('../modules/mailer.js');

/**
 * Adds scheduled jobs for sending emails by checking for
 * classes starting in 30 min every 15 min using chron job 
 * and jobsModel script. Loop through each class to get clients
 * and then loop through clients to get their emails. Finally,
 * send the email to all clients of each class.
 */
async function scheduleEmail() {
    schedule.scheduleJob('*/10 * * * * *', async function() {
        const classArr = await jobsModel.getByMinutesFromNow(30);
        classArr.forEach(async function(classInfo) {
            const id = classInfo.id;
            const clients = await clientsModel.getByJobId(id);
            const emails = await Promise.all(clients.map(async function(client) {
                return client.email;
            }));
            mailer.sendReminders(classInfo, emails);
        });
    });
}

scheduleEmail();

module.exports = {
    scheduleEmail
};