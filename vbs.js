
var goal = 0;
var total = 0;
var d1 = 0;
var d2 = 0;
var d3 = 0;
var d4 = 0;

var getUrlParameter = function (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


var getTotal = function () {

    // Update total
    var tonightTotal = parseFloat($('#tonight').val());
    total = d1 + d2 + d3 + d4 + tonightTotal;
    $('#total').text(total);

    // Update status
    setTimeout(function () {
        var status = '';
        if (total < goal) {
            var difference = (goal - total).toFixed(2);
            status = '$' + difference + ' remaining'
        }
        else {
            status = 'MISSION ACCOMPLISHED';
        }
        $('#status').text(status);
    }, 3000);

}


// Get default values from query string
goal = getUrlParameter('goal');
d1 = getUrlParameter('d1');
d2 = getUrlParameter('d2');
d3 = getUrlParameter('d3');
d4 = getUrlParameter('d4');

goal = goal ? parseFloat(goal) : 0;
d1 = d1 ? parseFloat(d1) : 0;
d2 = d2 ? parseFloat(d2) : 0;
d3 = d3 ? parseFloat(d3) : 0;
d4 = d4 ? parseFloat(d4) : 0;

total = d1 + d2 + d3 + d4;


// Insert values into DOM
$('#goal').text(goal.toFixed(2));
$('#current').text(total.toFixed(2));
$('#total').text(total.toFixed(2));

// Register change handler
$('#tonight').change(getTotal)

$('#tonight').focus();

