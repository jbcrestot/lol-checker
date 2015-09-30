// bootstrap
var express = require('express'),
    session = require('express-session'),
    router = express.Router(),
    app = express();
// libraries
var _ = require('underscore');
// application
var parameters = require('../parameters.js'),
    userBusiness = require('../business/user.js'),
    userRepository = require('../model/userRepository.js');

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
            if (!_.isUndefined(summonerName) && '' !== summonerName)
            {
                // on vérifie qu'on a pas deja l'utilisateur
                //userRepository.get( summonerName, function( summonerId ) {
                    // si le retour n'est pas null, on a retrouvé l'utilisateur
                    //if ( !_.isNull( summonerId ) ) {
                    //    req.session.userId = summonerId;
                    //
                    //    return res.redirect('/summoner/'+summonerName);
                    //}

                    // si le retour est null, c'est un nouvel utilisateur
                    userBusiness.getSummonerByName(req.session.region, summonerName, function(foundUser, err) {
                        // if foundUser isn't returned, we got some error
                        if (!_.isObject(foundUser)) {

                            console.log(typeof foundUser);
                            console.log(foundUser);

                            return res.render('index.html', {error: err.error.message});
                        }
                        // we save the user if needed
                        //userRepository.save(foundUser);

                        return res.render('summoner.html', {summonerName: summonerName});
                    });
                //});
            }
            else {
                
                return res.render('index.html', {error: 'merci d\'entrer un nom de summoner'});
            }
        })
        
        // mandatory for riot API
        .get('/riot.html', function(req, res) {

            return res.render('riot.html');
        })

        .get('/summoner/:summonerName', function(req, res) {

            console.log(req.session.userId);
            return res.render('summoner.html', {summonerName: req.params.summonerName});
        })
        ;

module.exports = router;
