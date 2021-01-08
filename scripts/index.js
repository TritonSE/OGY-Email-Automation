const schedule = require('node-schedule');
const parser = require('./parser');

function startScript() {
    schedule.scheduleJob('*/15 * * * *', function () {
        parser.getJobsinDay();
    });
}

module.exports = {startScript};
