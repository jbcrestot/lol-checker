/**
 * @deprecated
 * This file handle summoner's call but need to be refactor to use webservice.js
 * Must br rename too
 *
 */

// application
var parameters = require('../parameters.js'),
    webService = require('../business/webService.js');


var clc = require('cli-color'),
    orange = clc.xterm(208),
    green = clc.xterm(40);

var purifySummonerName = function(summonerName) {
    return summonerName.toLowerCase().replace(/ /g,'');
};

exports.getSummoner = function (region, summonerName, callBack) {
//    mock
//    var a = {"undefined":{"id":19897772,"name":"Undefined","profileIconId":692,"summonerLevel":30,"revisionDate":1410898743000}}; callBack(a); return ;

        var url = parameters.riotApi.url.host + parameters.riotApi.url.base + region +
                    parameters.riotApi.url.bySummonerName +
                    encodeURIComponent(summonerName) + '?api_key=' + parameters.riotApi.key;

        console.log(clc.green("{WS} "+ url));

    webService.call(url, function(foundUser, error) {
        // en cas d'erreur
        if ('undefined' !== typeof error) {
            // en cas d'erreur du web service
            if ('undefined' !== typeof error.webserviceStatusCode) {
                switch (httpClientResponse.statusCode) {
                    case 400:
                        message = 'Bad request';
                        break;
                    case 401:
                        message = 'Unauthorized';
                        break;
                    case 404:
                        message = 'No summoner data found for input : "'+ summonerName +'"';
                        break;
                    case 429:
                        message = 'Rate limit exceeded';
                        break;
                    case 500:
                        message = 'Internal Riot servor error';
                        break;
                    case 503:
                        message = 'Riot Service Unavailable';
                        break;
                }

                // TODO do something with this error
            }
        }

        key = purifySummonerName(summonerName);

        callBack(foundUser[key]);
    });
};
