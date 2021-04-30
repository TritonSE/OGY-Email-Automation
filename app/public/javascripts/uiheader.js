$(document).ready(function() {
    console.log("javascript is running");
    $('#datatable').dataTable({
        "iDisplayLength": 5,
        "order": [[ 0, "desc" ]],
        "oLanguage": {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Enter Keywords Here",
            "sInfo": "_START_ -_END_ of _TOTAL_",
            "sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
                '<option value="5">5</option>' +
                '<option value="8">8</option>' +
                '<option value="10">10</option>' +
                '<option value="15">15</option>' +
                '<option value="20">20</option>' +
                '<option value="50">50</option>' +
                '<option value="-1">All</option>' +
                '</select></div>'
        },
        bAutoWidth: false
    });
});

$(document).ready(function(){
    $('select').formSelect();
    $('.modal').modal();
    $('.timepicker').timepicker();
    $('.datepicker').datepicker({minDate: new Date()});
});

function toggleNotification(client_id, job_id, is_recipient){
    $.ajax({
        url: `/clients/${client_id}`,
        type: 'PUT',
        data: {job_id, is_recipient:!is_recipient},
        success: function(data) {
            const image = document.getElementById('notification_bell');
            image.src = !is_recipient ? 'notification.svg' : 'no_notification.svg';
        }
    });
}
