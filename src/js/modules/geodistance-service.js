var Q = require('q');
var OFFICES_LAT_LONG = new google.maps.LatLng(46.792194, -71.287216);
var MAX_DISTANCE_METERS = 15000;
var gmapsDistanceService = new google.maps.DistanceMatrixService();
var distanceMatrixParams = {
    origins: [OFFICES_LAT_LONG],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    durationInTraffic: false,
    avoidHighways: false,
    avoidTolls: false
};

var TOO_FAR_ERROR_MESSAGE = 'Les stock sont épuisés dans votre région.';
var ADDRESS_ERROR_MESSAGE = 'Il y a eu un problème avec votre adresse.';

module.exports = {
    validateDestinationIsInBound: function(destination) {
        var deffered = Q.defer();

        distanceMatrixParams.destinations = [destination];

        gmapsDistanceService.getDistanceMatrix(distanceMatrixParams, function(response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK) {
                if (response.rows[0].elements[0].distance) {
                    var distance = response.rows[0].elements[0].distance.value;
                    if (distance < MAX_DISTANCE_METERS) {
                        deffered.resolve();
                    } else {
                        deffered.reject(TOO_FAR_ERROR_MESSAGE);
                    }
                } else {
                    deffered.reject(ADDRESS_ERROR_MESSAGE);
                }
            } else {
                deffered.reject(ADDRESS_ERROR_MESSAGE);
            }
        });

        return deffered.promise;
    }
};