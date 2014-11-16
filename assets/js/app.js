var SOURCE_LAT_LONG = new google.maps.LatLng(46.792194, -71.287216);
var MAX_DISTANCE_METERS = 25000;
var destination = "3848 Louise-Fiset, Sainte-Foy";

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
    {
        origins: [SOURCE_LAT_LONG],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: false,
        avoidHighways: false,
        avoidTolls: false
    }, callback);

function callback(response, status) {
    if (status == 'OK') {
        var distance = response.rows[0].elements[0].distance.value;
        console.log(distance);

        if (distance > MAX_DISTANCE_METERS) {
            alert('Les stock sont épuisés dans votre région');
        } else {
            alert('Bienvenu dans la confrérie')
        }
    }
}