//calendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
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
        events: 'https://fullcalendar.io/demo-events.json?overload-day',
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
});