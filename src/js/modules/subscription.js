var Q = require('q');
var keen = require('./keen-client');
var validateIsInBound = require('./validate-geodistance');
var addToCart = require('./payment');

var isAccessKeyValid = false;

function validateAccessKey(accessKey) {
    var deffered = Q.defer();

    var keenQueryParams = {
        eventCollection: keen.SUBSCRIBER_COLLECTION_NAME,
        filters: [{property_name:"recruiterKey", operator:"eq", property_value: accessKey}]
    }

    var keyCountQuery = new Keen.Query('count', keenQueryParams);
    keen.client.run(keyCountQuery, function (response) {
        if (response.result > 0) {
            isAccessKeyValid = true;
            deffered.resolve();
        } else {
            deffered.reject("La clé d'acces est invalide");
        }
    });

    return deffered.promise;
}

function showSubscriptionForm() {
    $('.step1').addClass('hidden');
    $('.step2').removeClass('hidden');
}

$('#submit-access-key').click(function () {
    var accessKey = $('#access-key').val();

    validateAccessKey(accessKey)
        .then(showSubscriptionForm)
        .fail(function(reason){
            window.alert(reason);
        });
});

function subscribeFormIsValid () {
    return (isFormInputValid('#new-member-name') && isFormInputValid('#shipping-address') && isFormInputValid('#shipping-city') && isFormInputValid('#postal-code'));
};

function isFormInputValid(id) {
    return $(id).val() != '';
}

$('#subscribe-button').click(function (event) {
    event.stopPropagation();
    if (subscribeFormIsValid()) {
        var destination = $('#shipping-address').val() + $('#postal-code').val();
        validateIsInBound(destination, addToCart);
    } else {
        alert('veuillez remplir le formulaire');
    }
});

$('#buy-membership').click(function(){
    $('.step0').addClass('hidden');
    $('.step1').removeClass('hidden');
});
