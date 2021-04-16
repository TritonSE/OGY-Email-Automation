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
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'timeGridWeek',
                    // dayGridMonth
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'addEventButton',
                        // center: 'title',
                        right: 'timeGridWeek,timeGridDay'
                    },
            
                    editable: true,
                    dayMaxEvents: true, // when too manyn events in a day, show the popover
                    //events: 'https://fullcalendar.io/demo-events.json?overload-day',
                    events: newEventList,
                    eventColor: '#FFCB8A',
                    // eventColor: '#F0AEE1',
                    // eventColor: '#F2F2B4',
            
                    customButtons: {
                        addEventButton: {
                            text: 'add event...',
                            click: function() {
                                var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                                var date = new Date(dateStr + 'T00:00:00'); // will be in local time          
                                var titleStr = prompt('Enter a title');
            
                                if (!isNaN(date.valueOf())) { // valid?
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
            
                    // events: 'https://fullcalendar.io/demo-events.json'
                });
                calendar.render();
            },
            error: function(err){
                console.error(err);
            }
        })
    });
    
});