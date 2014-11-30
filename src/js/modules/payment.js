var crypto = require('crypto');
var validateIsInBound = require('./validate-geodistance');
var keen = require('./keen-client');

var BASE_MEMBER_CODE = 'CONF'
var buyAsGift = false;
var orderComplete = false;

// TODO : 
// before allowing the user to subscribe, validate the intive code

var subscribeFormIsValid = function () {
    return (isFormInputValid('#new-member-name') && isFormInputValid('#shipping-address') && isFormInputValid('#shipping-city') && isFormInputValid('#postal-code'));
};

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

$('#subscribe-button').click(function (event) {
    event.stopPropagation();
    if (subscribeFormIsValid()) {
        var destination = $('#shipping-address').val() + $('#postal-code').val();
        validateIsInBound(destination, add3MonthtsToCart);
    } else {
        alert('veuillez remplir le formulaire');
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

function generateRecruiteKey(email){
    var hash = crypto.createHash('md5');
    var hashedEmail = hash.update(email).digest('hex');
    
    return BASE_MEMBER_CODE.concat('-', hashedEmail.substring(0,6));
};

Snipcart.execute('bind', 'order.completed', function (data) {
    var memberCode = generateRecruiteKey(data.billingAddress.email);
    
    var subscriber = {
        accessKey : 'an access key',
        email : data.billingAddress.email,
        recruitKey : memberCode
    }

    keen.client.addEvent(keen.SUBSCRIBER_COLLECTION_NAME, subscriber)
    orderComplete = true;
});

Snipcart.execute('bind', 'cart.closed', function() {
    if(orderComplete){
        $('.step0, .step1').addClass('hidden');
        $('.step2').removeClass('hidden');
    }
});
