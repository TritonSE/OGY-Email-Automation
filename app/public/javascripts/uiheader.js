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
    $('.modal-close waves-effect waves-green btn-flat').click(function(){
        const job_id = $(this).attr('id').split("_")[1];
        deleteNotification(job_id);
    });
    $('.notif_button').click(function(){
        const client_id = $(this).attr('id').split("_")[2];
        toggleNotification(client_id); 
    });
    $('.delete_button').click(function(){
        const client_id = $(this).attr('id').split("_")[1];
        deleteNotification(client_id);
    });
})

function toggleNotification(client_id){
    $.ajax({
        url: `/clients/toggle_notif/${client_id}`,
        type: 'PUT',
        data: {},
        success: function(data) {
            const image = document.getElementById('notification_bell_' + client_id);
            image.src = 'images/' + (data.is_recipient ? 'notification.svg' : 'no_notification.svg');
        }
    });
}

function deleteNotification(job_id){
    $.ajax({
        url:`/userInterface/deleteNotification/${job_id}`,
        type: 'PUT',
        data:{},
        sucess: function(data){

        }
    });
}
