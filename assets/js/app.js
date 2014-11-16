var OFFICES_LAT_LONG = new google.maps.LatLng(46.792194, -71.287216);
var MAX_DISTANCE_METERS = 25000;
var distanceService = new google.maps.DistanceMatrixService();

function fillSnipCartShippingAddress() {
    Snipcart.execute('setShippingAddress', {
        name: $('#new-member-name').val(),
        address1: $('#shipping-address').val(),
        country: 'CA',
        province: 'QC',
        city: 'Québec',
        postalCode: $('#postal-code').val()
    });
}

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

    var destination = $('#shipping-address').val();
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

function add3MonthtsToCart() {
    Snipcart.execute('item.add', {
        // Required properties
        id: '1',
        name: "3 mois d'abonnement",
        url: '/',
        price: 115,
        // Optional properties
        description: 'Sélection de bières exclusives finement préparée à chaque mois',
        quantity: 1,
        maxQuantity: 1,
        shippable: true
    });

    fillSnipCartShippingAddress();
}

$('#subscribe-button').click(function (event) {
    event.stopPropagation();
    if (subscribeFormIsValid()) {
        validateProvidedAddressIsInBound(add3MonthtsToCart);
    } else {
        alert('veuillez remplir le formulaire');
    }
});
