// bootstrap
var express = require('express'),
    session = require('express-session'),
    router = express.Router(),
    app = express();
// libraries
var _ = require('underscore');
// application
var parameters = require('../parameters.js'),
    business = require('../business/business.js'),
    repositoryUser = require('../model/userRepository.js');

// session parameters
app.use(session(parameters.session));

/* GET home page. */
router
        .get('/', function(req, res, next) {
    
            return res.render('index.html');
        })
        
        .post('/', function(req, res, next) {
            summonerName = req.param('summonerName');

            // summonerName is defined and not an empty string
            if ( !_.isUndefined(summonerName) 
//                    && '' !== summonerName
                    ) {
                // on vérifie qu'on a pas deja l'utilisateur
                repositoryUser.get( summonerName, function( summoner ) {
                    // si le retour n'est pas null, on a retrouvé l'utilisateur
                    if ( !_.isNull( summoner ) ) {
                        req.session.user = summoner;
                        
                        return res.redirect('/summoner/'+summonerName);
                    }

                    // si le retour est null, c'est un nouvel utilisateur
                    business.getSummoner('euw', summonerName, function(foundUser, error) {
                        // if foundUser isn't returned, we got some error
                        if (!_.isObject(foundUser)) {
                            
                            return res.render('index.html', {error: error.message});
                        }
                        
                        repositoryUser.save(foundUser);

                        return res.render('index.html', {summonerName: summonerName});
                    });
                });
            }
            else {
                return res.render('index.html');
            }
        })
        
        // mandatory for riot API
        .get('/riot.html', function(req, res) {
            res.render('riot.html');
        })

        .get('/summoner/:summonerName', function(req, res) {
            console.log(req.session.user);
            res.render('summoner.html', {summonerName: req.params.summonerName});
        })
        ;

module.exports = router;
