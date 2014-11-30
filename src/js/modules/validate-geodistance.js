var OFFICES_LAT_LONG = new google.maps.LatLng(46.792194, -71.287216);
var MAX_DISTANCE_METERS = 15000;
var gmapsDistanceService = new google.maps.DistanceMatrixService();
var errorContainerId = "#addressFormError";

function distanceMatrixCallback(successCallback, response, status) {
    if (status == 'OK') {
        if (response.rows[0].elements[0].distance) {
            var distance = response.rows[0].elements[0].distance.value;
            if (distance < MAX_DISTANCE_METERS) {
                successCallback()
            } else {
                $(errorContainerId).text("Les stock sont épuisés dans votre région.");
            }
        } else {
            $(errorContainerId).text("Il y a eu un problème avec votre adresse.");
        }
    } else {
        $(errorContainerId).text("Il y a eu un problème avec votre adresse.");
    }
}

function validateDestinationIsInBound(destination, successCallback){
	var distanceMatrixParams = {
        origins: [OFFICES_LAT_LONG],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: false,
        avoidHighways: false,
        avoidTolls: false
    };

	gmapsDistanceService.getDistanceMatrix(distanceMatrixParams, distanceMatrixCallback.bind(null, successCallback));
}

module.exports = validateDestinationIsInBound;