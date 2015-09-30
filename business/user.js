// application
var parameters = require('../parameters.js'),
    mock = require('./mock/user.js'),
    webService = require('../business/webService.js');
var Logger = require('easy-logger');
var elog = new Logger('{Business:User}');


// libraries
var _ = require('underscore');

var purifySummonerName = function(summonerName) {

    return summonerName.toLowerCase().replace(/ /g,'');
};

exports.getSummonerByName = function (region, summonerName, callback) {

    //if (!parameters.common.onlineMode) {
    //    callback();
    //
    //    return;
    //}

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
        console.log(viewModel);

        if (!_.isNull(error)) {
            console.log('error : '+error);
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
