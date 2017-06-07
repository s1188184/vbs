var results = false;
var goal = 0;
var d1 = 0;
var d2 = 0;
var d3 = 0;
var d4 = 0;
var current = 0;
var need = 0;
var today = 0;
var total = 0;


var getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

Number.prototype.formatMoney = function(c, d, t) {
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


var reset = function() {
    
    
    total = current;
    

    // Insert values into DOM
    $('#goal').text('$' + goal.formatMoney(2));
    $('#current').text('$' + current.formatMoney(2));
    $('#need').text('$' + need.formatMoney(2));

    $('#today-container').hide();
    $('#today').text('');

    $('#total').text(total.formatMoney(2));
    $('#status').text('');
};


var getTotal = function() {

    // Update total
    // var tonightTotal = parseFloat($('#tonight').val());
    total = current + today;
    $('#today-container').show();
    $('#today').text(today.formatMoney(2));
    $('#total').text(total);

    // Update status
    setTimeout(function () {
        var status = '';
        if (total < goal) {
            var difference = goal - total;
            status = '$' + difference.formatMoney(2) + ' remaining'
        }
        else {
            status = 'MISSION ACCOMPLISHED';
        }
        $('#status').text(status);
    }, 3000);

};

var toggle = function() {
    results = !results;
    if (results) {
        getTotal();
    }
    else {
        reset();
    }
}




// Get default values from query string
goal = getUrlParameter('goal');
d1 = getUrlParameter('d1');
d2 = getUrlParameter('d2');
d3 = getUrlParameter('d3');
d4 = getUrlParameter('d4');
today = getUrlParameter('today');

goal = goal ? parseFloat(goal) : 0;
d1 = d1 ? parseFloat(d1) : 0;
d2 = d2 ? parseFloat(d2) : 0;
d3 = d3 ? parseFloat(d3) : 0;
d4 = d4 ? parseFloat(d4) : 0;
today = today ? parseFloat(today) : 0;


// Do initial calculations
total = current = d1 + d2 + d3 + d4;
need = goal - current;

// Do initial display
reset();

// Register change handler
$('body').click(toggle);
$('body').keyup(toggle);

