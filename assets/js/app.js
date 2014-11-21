var degustationQuotes = ['dégustation', 'découverte', 'partage'];
var quoteIndex = 0;

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

$('#buy-gift, #buy-gift-how').click(function(){
   buyAsGift = true;
});

$('#buy-membership, #buy-membership-how').click(function(){
   buyAsGift = false;
});

var isAnimating = false;
$('#animate-beer').click(function(event) {
    if(!isAnimating) {
        isAnimating = true;
        $('#pour-pint').addClass('animate');
        window.setTimeout(function() {
            $('#pour-pint').removeClass('animate');
            isAnimating = false;
        }, 5000);
    }
});
