var keenService = require('./keen-service');
var validateDestinationIsInBound = require('./geodistance-service');
var addToCart = require('./payment');

var FORM_HAS_EMPTY_FIELDS = 'Tous les champs sont obligatoires.';
var SUBSCRIPTION_FORM_ID = '#subscription-form';
var ACCESS_KEY_ID = '#access-key';

function displayError(id, message) {
    $(id).text(message);
}

function showSubscriptionForm() {
    $('.step1').addClass('hidden');
    $('.step2').removeClass('hidden');
}

function validateSubscriptionFormIsFilled() {
    var isFilled = true;
    $(SUBSCRIPTION_FORM_ID + ' input').each(function () {
        var input = $(this);
        if (input.val() == '') {
            input.addClass('invalid');
            isFilled = false;
        }
    });

    if (!isFilled) throw new Error(FORM_HAS_EMPTY_FIELDS);
}

function validateDestination() {
    var destination = $('#shipping-address').val() + $('#postal-code').val();
    return validateDestinationIsInBound(destination);
}

function getUrlParameterValue(parameterKey) {
    var queryParameters = window.location.search.substring(1).split('&');
    for (var i = 0; i < queryParameters.length; i++) {
        var parameterKeyValue = queryParameters[i].split('=');
        if (parameterKeyValue[0] == parameterKey) {
            return parameterKeyValue[1];
        }
    }
    return false;
}

$(SUBSCRIPTION_FORM_ID + ' input').on('focus', function () {
    $(this).removeClass('invalid');
});

$('#subscribe-button').click(function (event) {
    event.stopPropagation();

	validateSubscriptionFormIsFilled();
	validateDestination()
		.then(addToCart)
		.fail(function (reason) {
			displayError('#subscription-form-error', reason);
		});
});

$('#buy-membership').click(function () {
    $('.step0').addClass('hidden');
    $('.step1').removeClass('hidden');
});

$('#submit-access-key').click(function () {
    var accessKey = $(ACCESS_KEY_ID).val();

    keenService.validateAccessKey(accessKey)
        .then(showSubscriptionForm)
        .fail(function (reason) {
			console.log('hello')
			displayError('#access-key-error', reason);
        });
});

(function initAccessKeyInput() {
    var accessKey = getUrlParameterValue('accessKey');
    if (accessKey) $(ACCESS_KEY_ID).val(accessKey);
})();
