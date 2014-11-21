var KEEN_PINTS_COLLECTION_NAME = 'poured-pints';
var BASE_POURED_PINTS = 531;
var degustationQuotes = ['dégustation', 'découverte', 'partage'];
var quoteIndex = 0;
var totalPouredPints = 0;

var KeenClient = new Keen({
//TODO: get those configs from server when we get one
    projectId: "546e63ce80a7bd58f8889388",       // String (required)
    writeKey: "0e2536115f8e068db6b9c03137916853cf10272b24abcf04e908b6ebea2903f2017bb7f71523d254ca38f068bb9e4abd6a984aeade597bf91cbbc51a20ed3649ac4186cc02aa748ef31c14dbc0d9fbfb4731a7b276a0c36923c8cd1c387cecfab1789ed5171ce36678586d9b52c529a6",
    readKey: "3e0329665881abd77038e7b513aa00615eab4ac6eb1e6027c67e219e84c14c82467dc0bed1380da972cbfc788c2c27a540b6acfa8475ef258113179201152c58c31ca6c6933de287e964064db6362f1bd98410a0c8c210398c293f00746d4bc4d0c80482c8bb1fe7e2c731e954acd4a5"
});

function getNextDegustationQuote() {
    quoteIndex++;
    if (quoteIndex == degustationQuotes.length) quoteIndex = 0;
    return degustationQuotes[quoteIndex];
}

function swapDegustationQuote() {
    var degustationQuoteElement = $('#degustation-quote');
    degustationQuoteElement.addClass('animated fadeOut');
    setTimeout(function () {
        degustationQuoteElement.removeClass('fadeOut');
        degustationQuoteElement.addClass('fadeIn');
        degustationQuoteElement.text(getNextDegustationQuote());
    }, 700);
}
setInterval(function () {
    swapDegustationQuote();
}, 3000);

$('#buy-gift, #buy-membership, #buy-gift-how, #buy-membership-how').click(function () {
    $('.step0').addClass('hidden');
    $('.step1').removeClass('hidden');
});

$('#buy-gift, #buy-gift-how').click(function () {
    buyAsGift = true;
});

$('#buy-membership, #buy-membership-how').click(function () {
    buyAsGift = false;
});


function incrementPintCount() {
    totalPouredPints++;
    $('#pint-counts').text(totalPouredPints);
}

function updatePintCount(newCount) {
    var interval = window.setInterval(function(){
        console.log('interval running');
        if(newCount > totalPouredPints){
            incrementPintCount();
        } else{
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

Keen.ready(getPintCount);

function poorAPint() {
    this.blur();
    KeenClient.addEvent(KEEN_PINTS_COLLECTION_NAME, {
        user_ip_address: "${keen.ip}"
    });
    incrementPintCount();
}

$('#pour-a-pint').click(poorAPint);
