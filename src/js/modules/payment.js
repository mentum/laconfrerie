var crypto = require('crypto');
var keenService = require('./keen-service');

var orderComplete = false;

function generateRecruiterKey(email){
    var hash = crypto.createHash('md5');
    
    return hash.update(email).digest('hex').substring(0,5);
}

Snipcart.execute('bind', 'order.completed', function (data) {
    var recruiterKey = generateRecruiterKey(data.billingAddress.email);
    
    var subscription = {
        accessKey : $('#access-key').val(),
        email : data.billingAddress.email,
        recruiterKey : recruiterKey
    };

    keenService.sendSubsriptionEvent(subscription);
    orderComplete = true;
});

Snipcart.execute('bind', 'cart.closed', function() {
    if(orderComplete){
        $('.step0, .step1, .step2').addClass('hidden');
        $('.step3').removeClass('hidden');
    }
});

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
    
    Snipcart.execute('setBillingAddress', snipCartAddressObject);
    Snipcart.execute('setShippingAddress', snipCartAddressObject);
}


module.exports = add3MonthtsToCart;
