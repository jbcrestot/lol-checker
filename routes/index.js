var express = require('express');
var router = express.Router();
var http = require('http');
var clc = require('cli-color');
var _ = require('underscore');

var parameters = require('../parameters.js');
var repositoryUser = require('../model/user.js');


/* GET home page. */
router
        .get('/', function(req, res) {
            console.log('affichage index');
    
            res.render('index.html');
        })
        .post('/', function(req, res) {
            summonerName = req.param('summonerName');
            if ( !_.isUndefined(summonerName) ) {
                // on vérifie qu'on a pas deja l'utilisateur
                repositoryUser.get( summonerName, function( summoner ) {
                    // si le retour est null, c'est un nouvel utilisateur
                    if ( !_.isNull( summoner ) ) {
                        res.redirect('/summoner/'+summoner);
                        return ;
                    }

                    getSummoner('euw', summonerName, function(foundUser) {
                        repositoryUser.save(foundUser);

                        res.render('index.html', {summonerName: summonerName});
                    });
                });
            }
        })
        
        // mandatory for riot API
        .get('/riot.html', function(req, res) {
            res.render('riot.html');
        })

        .get('/summoner/:summonerName', function(req, res) {
             
            res.render('summoner.html', {summonerName: req.params.summonerName});
        })

        ;

var getSummoner = function(region, summonerName, callBack) {
//    mock
//    var a = {"undefined":{"id":19897772,"name":"Undefined","profileIconId":692,"summonerLevel":30,"revisionDate":1410898743000}}; callBack(a); return ;
    
    
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
                            user = JSON.parse(result);
                            console.log( 'result :'+ result);
                            callBack( user[summonerName] );
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
