document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    let newEventList = [];
    $(document).ready(function() {
        $.ajax({
            type: 'GET',
            url: '/userInterface/getCalendar',
            success: function(result){
                for(i = 0; i < result.length; i++){
                    const startTime = new Date(result[i].iso_scheduled_time);
                    const startTimeString = startTime.toISOString();
                    const endTime = new Date(result[i].class_end_time);
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
                    editable: false,
                    dayMaxEvents: true, 
                    events: newEventList,
                    eventColor: '#FFCB8A',
                    timeZone: 'local'
                });
                calendar.render();
            },
            error: function(err){
                console.error(err);
            }
        })
    });
    
});
