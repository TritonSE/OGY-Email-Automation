$(document).ready(function() {
    console.log("javascript is running");
    $('#datatable').dataTable({
        "iDisplayLength": 5,
        "order": [
            [0, "desc"]
        ],
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

$(document).ready(function() {
    $('select').formSelect();

    $("#viewSwitch").find("input[type=checkbox]").on("change", function() {
        console.log("WOWWW");
        var status = $(this).prop('checked');
        console.log(status);

        if (status) {
            console.log("hiiii");
            window.location.href = "/userInterface/calendar";
        } else {
            console.log("HIIIII2");
            window.location.href = "/userInterface";
        }
    });
});