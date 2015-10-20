var express = require('express');
var router = express.Router();
// libraries
var _ = require('underscore');
// application
var parameters = require('../parameters.js');
var teamBusiness = require('../business/team.js');
var teamRepository = require('../model/teamRepository.js');
var Logger = require('easy-logger');
var elog = new Logger('{Routes:Team}');

/* GET users listing. */
router
    .get('/', function(req, res) {

        return res.redirect('/team/ladder');
    })
    .get('/ladder', function(req, res) {
        if ('param 5v5 + default') {
            teamBusiness.getChallenger5(req.session.region, function(challengerLadder) {

                return res.render('ladder.html', {
                    challengerLadder: challengerLadder
                });
            });
        } else { // param 3v3
            // teamBusiness.getChallenger3();
        }
    })
    .get('/summary', function(req, res) {

        return res.render('team/summary.html', {

        });
    })
    ;

module.exports = router;
