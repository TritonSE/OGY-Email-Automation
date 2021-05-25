document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    let newEventList = [];
    $(document).ready(function() {
        $.ajax({
            type: 'GET',
            url: '/userInterface/getCalendar',
            success: function(result){
                for(i = 0; i < result.length; i++){
                    const startTime = luxon.DateTime.fromISO(result[i].iso_scheduled_time).toJSDate();
                    const startTimeString = startTime.toISOString();
                    const endTime = luxon.DateTime.fromISO(result[i].class_end_time).toJSDate();
                    const endTimeString = endTime.toISOString();
                    const event = {
                        title: result[i].class_name,
                        start: startTimeString,
                        end: endTimeString
                    }
                    newEventList.push(event);
                }
                const calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'timeGridWeek',
                    headerToolbar: {
                        left: 'prev,next today',
                        right: 'timeGridWeek,timeGridDay'
                    },
                    editable: true,
                    dayMaxEvents: true, 
                    events: newEventList,
                    eventColor: '#FFCB8A',
                });
                calendar.render();
            },
            error: function(err){
                console.error(err);
            }
        })
    });
    
});
