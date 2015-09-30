// bootstrap_
var request = require('request');
var _ = require('underscore');
var parameters = require('../parameters');
var Logger = require('easy-logger');
elog = new Logger('{Business:WebService}');

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

    request(WSoptions, function(error, response, body) {
        logResponse(response);

        // on request fail
        if (error) {
            callback({}, {
                statusCode: 500,
                message: 'lol-checker: Internal error'
            });
        }

        // différent de 200, rediriger vers une page d'erreur
        // ou afficher une erreur
        if (200 === response.statusCode) {
            callback(body);
        }
        else {
            callback('', {
                error: {
                    webserviceStatusCode: response.statusCode
                }
            });
        }
    });
};


var getWebserviceUrl = function(options) {
    var baseUrl = 'https://' + parameters.riotApi.url.host + parameters.riotApi.url.base + options.region + options.uri,
        query = '?api_key=' + parameters.riotApi.key;

    // add query parameters
    _.each(options.parameters, function(element, index, list) {
        baseUrl += element + '/';
    });

    _.each(options.query, function(element, index, list) {
        query += '&' + index + '=' + element;
    });

    return baseUrl + query;
};

/**
 * Permet de log correctement les requettes
 *
 * @param {response} response
 * @returns {void}
 */
var logResponse = function (response) {
    // initialisation avec la méthode
    var stringToLog = response.connection._httpMessage.method + ' ';
    // on ajoute l'url
    stringToLog += response.connection._httpMessage._headers.host +
        response.connection._httpMessage.path + ' ';
    // on ajoute le status
    stringToLog += status = response.statusCode;
    switch (status) {
        case 200:
            elog.success(stringToLog);
            break;
        case 304:
            elog.notice(stringToLog);
            break;
        default:
            elog.critical(stringToLog);
            break;
    }
};

