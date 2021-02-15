/**
 * Get the date at an interval from today's date.
 *
 * @param interval
 * @returns {string}
 */
function getDateByInterval(interval){
    const date = new Date();
    date.setDate(date.getDate() + interval);
    let endDate = date.toISOString();
    endDate = endDate.substring(0, endDate.indexOf("."));
    return endDate;
}

module.exports=getDateByInterval;
