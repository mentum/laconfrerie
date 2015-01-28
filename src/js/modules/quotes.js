(function(){
    var quoteIndex = 0;
    var degustationQuotes = ['dégustation', 'découverte', 'partage'];

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
})();
