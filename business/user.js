// application
var parameters = require('../parameters.js'),
    webService = require('../business/webService.js');

// libraries
var _ = require('underscore');
var clc = require('cli-color'),
    orange = clc.xterm(208),
    green = clc.xterm(40);

var purifySummonerName = function(summonerName) {

    return summonerName.toLowerCase().replace(/ /g,'');
};

exports.getSummonerByName = function (region, summonerName, callback) {

    // get region from session
    var options = {
        uri: parameters.riotApi.url.bySummonerName,
        region: region,
        parameters : [
            encodeURIComponent(summonerName)
        ],
        query : {
            'type': 'RANKED_TEAM_5x5'
        }
    };

    webService.call(options, function(body, error) {
        // on devrait appeler l'assembler pour formater les données en fonction des besoins de la vues
        viewModel = body;

        if (!_.isNull(error)) {
            callback('', error);
        }
        callback(viewModel);
    });
    /*
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
    */
};
