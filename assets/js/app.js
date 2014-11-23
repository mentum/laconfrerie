var OFFICES_LAT_LONG = new google.maps.LatLng(46.792194, -71.287216);
var MAX_DISTANCE_METERS = 15000;
var distanceService = new google.maps.DistanceMatrixService();
var buyAsGift = false;
var degustationQuotes = ['dégustation', 'découverte', 'partage'];
var quoteIndex = 0;

function isFormInputValid(id) {
    return $(id).val() != '';
}

var subscribeFormIsValid = function () {
    return (isFormInputValid('#new-member-name') && isFormInputValid('#shipping-address') && isFormInputValid('#shipping-city') && isFormInputValid('#postal-code'));
};

function validateProvidedAddressIsInBound(successCallback) {
    function callback(response, status) {
        if (status == 'OK') {
            if (response.rows[0].elements[0].distance) {
                var distance = response.rows[0].elements[0].distance.value;
                if (distance < MAX_DISTANCE_METERS) {
                    successCallback()
                } else {
                    alert('Les stock sont épuisés dans votre région');
                }
            } else {
                alert('Il y a eu un problème avec votre adresse');
            }
        } else {
            alert('Il y a eu un problème avec votre adresse');
        }
    }

    var destination = $('#shipping-address').val() + $('#postal-code').val();
    distanceService.getDistanceMatrix(
        {
            origins: [OFFICES_LAT_LONG],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            durationInTraffic: false,
            avoidHighways: false,
            avoidTolls: false
        }, callback);
}

function fillSnipCartBillingAddress(addressObject) {
    Snipcart.execute('setBillingAddress', addressObject);
}

function fillSnipCartShippingAddress(addressObject) {
    Snipcart.execute('setShippingAddress', addressObject);
}

function add3MonthtsToCart() {
    Snipcart.execute('item.add', {
        id: '1',
        name: "3 mois d'abonnement",
        url: '/',
        price: 115,
        description: 'Sélection de bières exclusives finement préparée à chaque mois',
        quantity: 1,
        maxQuantity: 1,
        shippable: true
    });

    var snipCartAddressObject = {
        name: $('#new-member-name').val(),
        address1: $('#shipping-address').val(),
        country: 'CA',
        province: 'QC',
        city: 'Québec',
        postalCode: $('#postal-code').val()
    };

    if (!buyAsGift) {
        fillSnipCartBillingAddress(snipCartAddressObject);
    }
    fillSnipCartShippingAddress(snipCartAddressObject);
}

$('#subscribe-button').click(function (event) {
    event.stopPropagation();
    if (subscribeFormIsValid()) {
        validateProvidedAddressIsInBound(add3MonthtsToCart);
    } else {
        alert('veuillez remplir le formulaire');
    }
});

$('#buy-gift, #buy-membership').click(function () {
    $('.step0').addClass('hidden');
    $('.step1').removeClass('hidden');
});

$('#buy-gift').click(function () {
    buyAsGift = true;
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

$('#buy-gift, #buy-gift-how').click(function(){
   buyAsGift = true;
});

$('#buy-membership, #buy-membership-how').click(function(){
   buyAsGift = false;
});

Snipcart.execute('bind', 'order.completed', function(data){
    console.log('antoine', data);
});
