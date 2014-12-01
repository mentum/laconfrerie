var Q = require('q');
var keenClient = client = new Keen({
//TODO: get those configs from server when we get one
    projectId: "546e63ce80a7bd58f8889388",
    writeKey: "0e2536115f8e068db6b9c03137916853cf10272b24abcf04e908b6ebea2903f2017bb7f71523d254ca38f068bb9e4abd6a984aeade597bf91cbbc51a20ed3649ac4186cc02aa748ef31c14dbc0d9fbfb4731a7b276a0c36923c8cd1c387cecfab1789ed5171ce36678586d9b52c529a6",
    readKey: "3e0329665881abd77038e7b513aa00615eab4ac6eb1e6027c67e219e84c14c82467dc0bed1380da972cbfc788c2c27a540b6acfa8475ef258113179201152c58c31ca6c6933de287e964064db6362f1bd98410a0c8c210398c293f00746d4bc4d0c80482c8bb1fe7e2c731e954acd4a5"
});

var PINTS_COLLECTION_NAME = 'poured-pints';
var SUBSCRIBER_COLLECTION_NAME = 'subscriptions';

module.exports = {
	sendSubsriptionEvent: function (subscription) {
		keenClient.addEvent(SUBSCRIBER_COLLECTION_NAME, subscription)
	},
	sendPouredPintEvent: function () {
	    keenClient.addEvent(PINTS_COLLECTION_NAME, {user_ip_address: "${keen.ip}"});
	},
	getPouredPintCount: function () {
		var deferred = Q.defer();

	    Keen.ready(function (){
	    	var countQuery = new Keen.Query('count', {eventCollection: PINTS_COLLECTION_NAME});

	        keenClient.run(countQuery, function (response) {
	        	deferred.resolve(response.result);
	    	});
	    });

    	return deferred.promise;
	},
	validateAccessKey: function (accessKey) {
	    var deferred = Q.defer();

	    var keenQueryParams = {
	        eventCollection: SUBSCRIBER_COLLECTION_NAME,
	        filters: [{property_name:"recruiterKey", operator:"eq", property_value: accessKey}]
	    };

	    var keyCountQuery = new Keen.Query('count', keenQueryParams);
	    keenClient.run(keyCountQuery, function (response) {
	        if (response.result > 0) {
	            isAccessKeyValid = true;
	            deferred.resolve();
	        } else {
	            deferred.reject("La clé d'accès est invalide");
	        }
	    });

	    return deferred.promise;
	}
};
