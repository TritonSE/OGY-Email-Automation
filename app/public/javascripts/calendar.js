$(document).ready(function() {
    const events = [ {
        title: '1 HR Intro to Photoshop Workshop',
        allday: 'false',
        start: '2019-07-01T17:00:00',
        end: '2019-07-01T18:00:00',
        color: '#ff9800'
    },
        {
            title: '1 HR Intro to Photoshop Workshop',
            allday: 'false',
            start: '2019-07-22T11:00:00',
            end: '2019-07-22T12:00:00',
            color: '#ff9800'
        },]
    console.log(events);
    $('#calendar').fullCalendar({
        height: 600,
        header: {
            left: '',
            center: 'prev title next',
            right: ''
        },
        events,
    });
});
