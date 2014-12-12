var keenService = require('./keen-service');
var validateDestinationIsInBound = require('./geodistance-service');
var addToCart = require('./payment');

var FORM_HAS_EMPTY_FIELDS = 'Tous les champs sont obligatoires.';
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

function validateSubscriptionFormIsFilled() {
    var isFilled = true;
    $(subscriptionFormId + ' input').each(function() {
        var input = $(this);
        if(input.val() == '') {
            input.addClass('invalid');
            isFilled = false;
        }
    });

    if(!isFilled) throw new Error(FORM_HAS_EMPTY_FIELDS);
}

function validateDestination() {
    var destination = $('#shipping-address').val() + $('#postal-code').val();
    return validateDestinationIsInBound(destination)
}

$(subscriptionFormId + ' input').on('focus', function() {
   $(this).removeClass('invalid');
});

$('#subscribe-button').click(function (event) {
    event.stopPropagation();

    try {
        validateSubscriptionFormIsFilled();
        validateDestination()
            .then(addToCart)
            .fail(function(reason) {
                throw new Error(reason);
            });
    } catch(error) {
        displayError('#subscription-form-error', error.message);
    }
});

$('#buy-membership').click(function(){
    $('.step0').addClass('hidden');
    $('.step1').removeClass('hidden');
});
