// bootstrap_
var http = require('http'),
    clc = require('cli-color'),
    orange = clc.xterm(208);

/**
 * Permet d'effectué un appel web service
 * 
 * @param {string} summonerName
 * @param {array} options
 * @param {function} callBack
 * @returns {void}
 */
exports.call = function (summonerName, options, callBack) {

    var result = '';
    http.request(options, function (httpClientResponse) {
        // on log l'appel
        log(httpClientResponse);
        // en cas de différent de 200, rediriger vers une page d'erreur 
        // ou afficher une erreur
        if (200 === httpClientResponse.statusCode) {

            // bind de l'event data
            httpClientResponse
                    .on('data', function (chunk) {
                        result += chunk;
                    })
                    .on('end', function () {
                        console.log(orange('{webService:call} ') +'result : '+ result);
                        user = JSON.parse(result);
                        key = purifySummonerName(summonerName);
                        
                        callBack(user[key]);
                    });
        }
        else {
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

            error = {
                error: {
                    statusCode: httpClientResponse.statusCode,
                    message: message
                }
            };

            callBack('', error);
        }

    })
            // on request fail
            .on('error', function (data) {
                console.log('Request Failed :');
                console.log(data);


                callBack('', {
                    statusCode: 500,
                    message: 'lol-checker: Internal error'
                });
            })
            // on envoie finalement la requette
            .end();
};

/**
 * Permet de log correctement les requettes
 * 
 * @param {httpClientResponse} httpClientResponse
 * @returns {void}
 */
var log = function (httpClientResponse) {
    // initialisation avec la méthode
    var stringToLog = httpClientResponse.connection._httpMessage.method + ' ';
    // on ajoute l'url
    stringToLog += httpClientResponse.connection._httpMessage._headers.host +
            httpClientResponse.connection._httpMessage.path + ' ';
    // on ajoute le status
    status = httpClientResponse.statusCode;
    switch (status) {
        case 200:
            stringToLog += clc.green(status);
            break;
        case 304:
            stringToLog += clc.blue(status);
            break;
        default:
            stringToLog += clc.red(status);
            break;
    }
    // finalement on log
    console.log(stringToLog);
};

var purifySummonerName = function(summonerName) {
    return summonerName.toLowerCase().replace(/ /g,'');
};

exports.log = log;