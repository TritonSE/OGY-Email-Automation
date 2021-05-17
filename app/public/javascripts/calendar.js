document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    let newEventList = [];
    $(document).ready(function() {
        $.ajax({
            type: 'GET',
            url: '/userInterface/getCalendar',
            success: function(result){
                for(i = 0; i < result.length; i++){
                    const startTime = new Date(result[i].scheduled_time);
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
                        center: 'addEventButton',
                        right: 'timeGridWeek,timeGridDay'
                    },
            
                    editable: true,
                    dayMaxEvents: true, 
                    events: newEventList,
                    eventColor: '#FFCB8A',
            
                    customButtons: {
                        addEventButton: {
                            text: 'add event...',
                            click: function() {
                                const dateStr = prompt('Enter a date in YYYY-MM-DD format');
                                const date = new Date(dateStr + 'T00:00:00'); // will be in local time          
                                const titleStr = prompt('Enter a title');
            
                                if (!isNaN(date.valueOf())) { 
                                    calendar.addEvent({
                                        title: titleStr,
                                        start: date,
                                        allDay: true
            
                                    });
                                    alert('Great. Now, update your database...');
                                } else {
                                    alert('Invalid date.');
                                }
            
                            }
            
                        }
            
                    }
            
                });
                calendar.render();
            },
            error: function(err){
                console.error(err);
            }
        })
    });
    
});