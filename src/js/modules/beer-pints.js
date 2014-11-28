var KeenClient = require('./keen-client');
var KEEN_PINTS_COLLECTION_NAME = 'poured-pints';
var BASE_POURED_PINTS = 531;
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
    });
}

function getPintCount() {
    var countQuery = new Keen.Query('count', {eventCollection: KEEN_PINTS_COLLECTION_NAME});

    KeenClient.run(countQuery, function (response) {
        updatePintCount(response.result + BASE_POURED_PINTS);
    });
}

function pushPouredBeerEvent() {
    KeenClient.addEvent(KEEN_PINTS_COLLECTION_NAME, {
        user_ip_address: "${keen.ip}"
    });
    incrementPintCount();
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
    pushPouredBeerEvent();
    animateBeer();
});

Keen.ready(getPintCount);
