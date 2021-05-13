
/**
 * Determines if a job has no changes or is already up to date.
 * 
 * @param {*} apiJob class details retrieved from the api
 * @param {*} storedJob class details retrieved from the database
 * @param {*} clientDiff array that stores the differences between clients in the database
 *                       and clients from the api.
 * @returns boolean of whether or not the job is up to date.
 */
async function isJobUpdated(apiJob, storedJob, clientDiff){
    const isClientsUpdated = clientDiff[0].length === 0 && clientDiff[1].length === 0;
    if(!isClientsUpdated)
        return false;
    
    return new Date(storedJob.scheduled_time).getTime() === new Date(apiJob.scheduled_time).getTime() &&
        storedJob.instructor_first_name === apiJob.instructor_first_name &&
        storedJob.instructor_last_name === apiJob.instructor_last_name &&
        new Date(storedJob.class_end_time).getTime() === new Date(apiJob.class_end_time).getTime();
}

module.exports = {
    isJobUpdated
}