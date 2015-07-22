// bootstrap_
var request = require('request'),
    clc = require('cli-color'),
    orange = clc.xterm(208),
    _ = require('underscore'),
    parameters = require('../parameters');

/**
 * Permet d'effectué un appel web service
 *
 * @param {string} summonerName
 * @param {array} options
 * @param {function} callback
 * @returns {void}
 */
exports.call = function (options, callback) {
    var result = '',
        WSoptions = {
            json: true,
            method: 'GET',
            uri: getWebserviceUrl(options)
        };
    console.log(clc.green("{WS} "+WSoptions.uri));

    request(WSoptions, function(error, response, body) {
            // on request fail
            if (error) {
                console.log(clc.orange('Request Failed :'));
                console.log(clc.orange(error));

                callback('', {
                    statusCode: 500,
                    message: 'lol-checker: Internal error'
                });
            }

            // on log l'appel
            log(response);
            // différent de 200, rediriger vers une page d'erreur
            // ou afficher une erreur
            if (200 === response.statusCode) {
                console.log(clc.green("{WS} responde with a status 200"));
                console.log('body :');
                console.log(body);

                callback(body);
            }
            else {
                callback('', {
                    error: {
                        webserviceStatusCode: response.statusCode,
                    }
                });
            }
        });
};


var getWebserviceUrl = function(options) {
    var baseUrl = 'https://' + parameters.riotApi.url.host + parameters.riotApi.url.base + options.region + options.uri,
        query = '?api_key=' + parameters.riotApi.key;

    _.each(options.parameters, function(element, index, list) {
        baseUrl += element + '/';
    });

    _.each(options.query, function(element, index, list) {
        query += '&' + index + element;
    });

    return baseUrl + query;
};

/**
 * Permet de log correctement les requettes
 *
 * @param {response} response
 * @returns {void}
 */
var log = function (response) {

    return ;
    // initialisation avec la méthode
    var stringToLog = response.connection._httpMessage.method + ' ';
    // on ajoute l'url
    stringToLog += response.connection._httpMessage._headers.host +
            response.connection._httpMessage.path + ' ';
    // on ajoute le status
    status = response.statusCode;
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


exports.log = log;
