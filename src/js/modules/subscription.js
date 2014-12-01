var keenService = require('./keen-service');
var validateIsInBound = require('./validate-geodistance');
var addToCart = require('./payment');

var isAccessKeyValid = false;

function showSubscriptionForm() {
    $('.step1').addClass('hidden');
    $('.step2').removeClass('hidden');
}

$('#submit-access-key').click(function () {
    var accessKey = $('#access-key').val();

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
