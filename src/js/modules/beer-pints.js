var keenService = require('./keen-service');
var totalPouredPints = 0;
var isBeerAnimating = false;

function incrementPintCount() {
    totalPouredPints++;
    $('#pint-counts').text(totalPouredPints);
}

function updatePintCount(newCount) {
    var interval = window.setInterval(function () {
        if (newCount > totalPouredPints) {
            incrementPintCount();
        } else {
            window.clearInterval(interval);
        }
    }, 0);
}

function animateBeer() {
    if (!isBeerAnimating) {
        isBeerAnimating = true;
        var pourPintButton = $('#pour-pint')
        pourPintButton.addClass('animate');
        window.setTimeout(function () {
            $('#pour-pint').removeClass('animate');
            isBeerAnimating = false;
        }, 5000);
    }
}

$('#pour-a-pint').click(function () {
    keenService.sendPouredPintEvent();
    incrementPintCount();
    animateBeer();
});

keenService.getPouredPintCount().then(updatePintCount);
