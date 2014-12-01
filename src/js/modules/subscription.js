var keenService = require('./keen-service');
var validateIsInBound = require('./validate-geodistance');
var addToCart = require('./payment');

var subscriptionFormId = '#subscription-form';

function displayError(id, message) {
    $(id).text(message);
}

function showSubscriptionForm() {
    $('.step1').addClass('hidden');
    $('.step2').removeClass('hidden');
}

$('#submit-access-key').click(function () {
    var accessKey = $('#access-key').val();

    keenService.validateAccessKey(accessKey)
        .then(showSubscriptionForm)
        .fail(function(reason){
            displayError('#access-key-error', reason);
        });
});

function validateSubscriptionForm() {
    if (!validateSubscriptionFormIsFilled()) {
        displayError('#subscription-form-error', 'Tous les champs sont obligatoires.')
        return false;
    }
    return true;
}

function validateSubscriptionFormIsFilled() {
    var isFilled = true;
    $(subscriptionFormId + ' input').each(function() {
        var input = $(this);
        if(input.val() == '') {
            input.addClass('invalid');
            isFilled = false;
        }
    });
    return isFilled;
}

$(subscriptionFormId + ' input').on('focus', function() {
   $(this).removeClass('invalid');
});

$('#subscribe-button').click(function (event) {
    event.stopPropagation();

    var isSubscriptionFormValid = validateSubscriptionForm();
    if (isSubscriptionFormValid) {
        var destination = $('#shipping-address').val() + $('#postal-code').val();
        validateIsInBound(destination, addToCart);
    }
});

$('#buy-membership').click(function(){
    $('.step0').addClass('hidden');
    $('.step1').removeClass('hidden');
});
