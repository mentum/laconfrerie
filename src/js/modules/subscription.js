var keenService = require('./keen-service');
var validateDestinationIsInBound = require('./geodistance-service');
var addToCart = require('./payment');

var ACCESS_KEY_ID = '#access-key';
var isAccessKeyValid = false;

function displayError(id, message) {
    $(id).text(message);
}

function showSubscriptionForm() {
    $('.step1').addClass('hidden');
    $('.step2').removeClass('hidden');
}

function subscribeFormIsValid () {
    return (isFormInputValid('#new-member-name') && isFormInputValid('#shipping-address') && isFormInputValid('#shipping-city') && isFormInputValid('#postal-code'));
}

function isFormInputValid(id) {
    return $(id).val() != '';
}

function getUrlParameterValue(parameterKey) {
    var queryParameters = window.location.search.substring(1).split('&');

    for(var i = 0; i < queryParameters.length; i++) {
        var parameterKeyValue = queryParameters[i].split('=');
        if(parameterKeyValue[0] == parameterKey) {
            return parameterKeyValue[1];
        }
    }

    return false;
}

$('#subscribe-button').click(function (event) {
    event.stopPropagation();
    if (subscribeFormIsValid()) {
        var destination = $('#shipping-address').val() + $('#postal-code').val();
        validateDestinationIsInBound(destination)
            .then(addToCart)
            .fail(function(reason){
                displayError('#subscription-form-error', reason);
            });
    } else {
        alert('veuillez remplir le formulaire');
    }
});

$('#buy-membership').click(function(){
    $('.step0').addClass('hidden');
    $('.step1').removeClass('hidden');
});

$('#submit-access-key').click(function () {
    var accessKey = $(ACCESS_KEY_ID).val();

    keenService.validateAccessKey(accessKey)
        .then(showSubscriptionForm)
        .fail(function(reason){
            window.alert(reason);
        });
});

(function initAccessKeyInput() {
    var accessKey = getUrlParameterValue('accessKey');
    if(accessKey) $(ACCESS_KEY_ID).val(accessKey);
})();
