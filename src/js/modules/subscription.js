var keenService = require('./keen-service');
var validateDestinationIsInBound = require('./geodistance-service');
var addToCart = require('./payment');
var getUrlParameterValue = require('./url-parameters');

var ACCESS_KEY_ID = '#access-key';
var isAccessKeyValid = false;

function displayError(id, message) {
    $(id).text(message);
}

function showSubscriptionForm() {
    $('.step1').addClass('hidden');
    $('.step2').removeClass('hidden');
}

$('#submit-access-key').click(function () {
    var accessKey = $(ACCESS_KEY_ID).val();

    keenService.validateAccessKey(accessKey)
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

(function initAccessKeyInput() {
    var accessKey = getUrlParameterValue('accessKey');
    if(accessKey) {
        $(ACCESS_KEY_ID).val(accessKey);
    }
})();

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
