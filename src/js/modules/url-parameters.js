function getUrlParameterValue(parameterKey) {
    var queryParameters = window.location.search.substring(1).split('&');

    for(var i = 0; i < queryParameters.length; i++) {
        var parameterKeyValue = queryParameters[i].split('=');
        if(parameterKeyValue[0] == parameterKey) {
            return parameterKeyValue[1];
        }
    }

    return false;
}

module.exports = getUrlParameterValue;
