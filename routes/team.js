var express = require('express');
var router = express.Router();
// libraries
var _ = require('underscore');
// application
var parameters = require('../parameters.js'),
teamBusiness = require('../business/team.js'),
teamRepository = require('../model/teamRepository.js');

/* GET users listing. */
router
    .get('/', function(req, res) {

        return res.redirect('/team/ladder');
    })
    .get('/ladder', function(req, res) {

        teamBusiness.getChallenger('euw', 'RANKED_TEAM_5x5', function(challengerLadder) {

            return res.render('ladder.html', {"challengerLadder":challengerLadder});
        });
    })
    ;

module.exports = router;
