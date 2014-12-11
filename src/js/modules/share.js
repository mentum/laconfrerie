var FACEBOOK_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php',
    TWITTER_SHARE_URL = 'https://twitter.com/intent/tweet',
    LA_CONFRERIE_SHARE_URL = 'http://laconfrerie.ca/?accessKey=';

function bindShareButtonsLinks(accessKey) {
    var openWindowOptions = getOpenWindowOptions();

    $('#share-fb').click(function(e) {
        e.preventDefault();
        var facebookShareUrl = getFacebookShareUrl(accessKey);
        window.open(facebookShareUrl, '', openWindowOptions);
    });

    $('#share-twitter').click(function(e) {
        e.preventDefault();
        var twitterShareUrl = getTwitterShareUrl(accessKey);
        window.open(twitterShareUrl, '', openWindowOptions);
    });
}

function getOpenWindowOptions() {
    var width  = 600,
        height = 300,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2;

    return 'status=1' +
        ',width=' + width  +
        ',height=' + height +
        ',top=' + top +
        ',left=' + left +
        ',menubar=no' +
        ',toolbar=no' +
        ',resizable=yes' +
        ',scrollbars=yes';
}

function getFacebookShareUrl(accessKey) {
    return FACEBOOK_SHARE_URL +
        '?u=' + escape(LA_CONFRERIE_SHARE_URL + accessKey) +
        "&t=" + escape(document.title)
}

function getTwitterShareUrl(accessKey) {
    return TWITTER_SHARE_URL +
        '?url=' + escape(LA_CONFRERIE_SHARE_URL + accessKey) +
        "&hashtags=laconfrerie";
}

module.exports = bindShareButtonsLinks;
