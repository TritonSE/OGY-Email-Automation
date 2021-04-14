// Converts MySQL date format to a valid date
function convert(str) {
    const date = new Date(str),
        mnth = ('0' + (date.getMonth()+1)).slice(-2),
        day  = ('0' + date.getDate()).slice(-2),
        hour = ('0' + date.getHours()).slice(-2),
        min = ('0' + date.getMinutes()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join('-')+', '+[hour, min].join(':');
}

module.exports = convert;
