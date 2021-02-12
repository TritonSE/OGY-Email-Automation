const schedule = require('node-schedule');
const parser = require('./parser');

/**
 * The main function that gets called when the app starts running
 * all of the automated mindbody api to sql database connection
 * logics, as well as worker dequeue logic will be used here.
 */
function startScript() {
    schedule.scheduleJob('*/15 * * * *', async function () {
        await parser.getJobsInWeek();
    });
}

module.exports = {startScript};
