const schedule = require('node-schedule');

function startScript() {
    schedule.scheduleJob('*/15 * * * *', function () {

    });
}

module.exports = {startScript};
