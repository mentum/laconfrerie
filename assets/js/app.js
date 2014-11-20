(function() {
    "use strict";

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

    $('#buy-gift, #buy-gift-how').click(function () {
        buyAsGift = true;
    });

    $('#buy-membership, #buy-membership-how').click(function () {
        buyAsGift = false;
    });

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

})();
