const schedule = require('node-schedule');
const parser = require('./parser');
const http = require("http");

/**
 * The main function that gets called when the app starts running
 * all of the automated mindbody api to sql database connection
 * logics, as well as worker dequeue logic will be used here.
 */
function startScript() {
    schedule.scheduleJob('*/15 * * * *', async function () {
        await parser.getJobsInWeek();
    });
    // Used to keep the scheduler alive on Heroku
    if (process.env.KEEPALIVE_SERVER_IP) {
      schedule.scheduleJob('*/10 * * * *', async function () {
          http.get(process.env.KEEPALIVE_SERVER_IP);
      });
    }
}

module.exports = {startScript};
