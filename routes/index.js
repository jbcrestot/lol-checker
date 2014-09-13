var express = require('express');
var router = express.Router();
var http = require('http');
var clc = require('cli-color');
var parameters = require('../parameters.js');


/* GET home page. */
router
        .get('/', function(req, res) {
            res.render('index.html', {title: 'Express'});
        })
        // mandatory for riot API
        .get('riot.html', function(req, res) {
            res.render('riot.html');
        })

        .get('/summoner/:summonerName', function(req, res) {

            getSummoner(res, 'euw', req.params.summonerName, function(result) {
                
                res.render('summoner.html', {summonerName: req.params.summonerName, result: result});
            });
        })

        ;

var getSummoner = function(res, region, summonerName, callBack) {
    var path = parameters.riotApi.url.base + region + 
            parameters.riotApi.url.bySummonerName + 
            summonerName +'?api_key='+ parameters.riotApi.key,
        options = {
            host: parameters.riotApi.url.host,
            port: 80,
            path: path,
            method: 'GET'
        },
        result = '';

        http.request(options, function(httpClientResponse) {
                // on log l'appel
                logHttpRequest(httpClientResponse);
                
                // en cas de différent de 200, rediriger vers une page d'erreur 
                // ou afficher une erreur
                if ( 200 === httpClientResponse.statusCode ) {

                    // bind de l'event data
                    httpClientResponse
                        .on('data', function(chunk){
                            result += chunk;
                        })
                        .on('end', function(){
                            console.log( 'result :');
                            console.log( result );
                                callBack(result);
                        });
                }

            })
            // on request fail
            .on('error', function(data) {
                console.log('Request Failed :');
                console.log(data);
            })
            // on envoie finalement la requette
            .end();
},
        
        logHttpRequest = function(response) {
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
            console.log( stringToLog );
        };

module.exports = router;
