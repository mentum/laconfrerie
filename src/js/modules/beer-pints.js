var keen = require('./keen-client');
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
    var countQuery = new Keen.Query('count', {eventCollection: keen.PINTS_COLLECTION_NAME});

    keen.client.run(countQuery, function (response) {
        updatePintCount(response.result);
    });
}

function pushPouredBeerEvent() {
    keen.client.addEvent(keen.PINTS_COLLECTION_NAME, {
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
