const schedule = require('node-schedule');
const { getJobs15Mins } = require('./parser');

function startScript() {
    schedule.scheduleJob('*/5 * * * * *', function () {
        getJobs15Mins()
    });
}

module.exports = {startScript};
