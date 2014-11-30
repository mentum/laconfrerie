var crypto = require('crypto');
var validateIsInBound = require('./validate-geodistance');
var keen = require('./keen-client');

var buyAsGift = false;
var orderComplete = false;

var subscribeFormIds = {
    input: [
        '#new-member-name',
        '#shipping-address',
        '#shipping-city',
        '#postal-code'
    ],
    errorMessage: '#addressFormError'
};

// TODO :
// before allowing the user to subscribe, validate the invite code

var validateSubscribeForm = function () {
    var formIsValid = validateInputs();

    if(formIsValid) {
        $(subscribeFormIds.errorMessage).empty();
    } else {
        $(subscribeFormIds.errorMessage).text("Tous les champs sont obligatoires.");
    }

    return formIsValid;
};


function validateInputs() {
    var areInputsValid = true;

    subscribeFormIds.input.forEach(function(inputId) {
        if(isFormInputValid(inputId)) {
            $(inputId).removeClass('invalid');
        } else {
            $(inputId).addClass('invalid');
            areInputsValid = false;
        }
    });
    
    return areInputsValid;
}

function isFormInputValid(id) {
    return $(id).val() != '';
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

$(subscribeFormIds.input.join(',')).on('focus', function() {
    $(this).removeClass('invalid');
});

$('#subscribe-button').click(function (event) {
    event.stopPropagation();

    if (validateSubscribeForm()) {
        var destination = $('#shipping-address').val() + $('#postal-code').val();
        validateIsInBound(destination, add3MonthtsToCart);
    }
});

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

function generateRecruiterKey(email){
    var hash = crypto.createHash('md5');
    
    return hash.update(email).digest('hex').substring(0,5);
};

Snipcart.execute('bind', 'order.completed', function (data) {
    var recruiterKey = generateRecruiterKey(data.billingAddress.email);
    
    var subscriber = {
        accessKey : 'an access key',
        email : data.billingAddress.email,
        recruiterKey : recruiterKey
    }

    keen.client.addEvent(keen.SUBSCRIBER_COLLECTION_NAME, subscriber);
    orderComplete = true;
});

Snipcart.execute('bind', 'cart.closed', function() {
    if(orderComplete){
        $('.step0, .step1').addClass('hidden');
        $('.step2').removeClass('hidden');
    }
});
