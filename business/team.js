// application
var _ = require('underscore');
var parameters = require('../parameters.js');
var webService = require('../business/webService.js');
var teamMock = require('./mock/team.js')
var Logger = require('easy-logger');
var elog = new Logger('{Business:Team}');

/**
 * Classement des équipes challenger 5v5
 * @param region
 * @param type
 * @param callback
 */
exports.getChallenger5 = function (region, callback) {
    elog.notice('Challenger Team')
    if (!parameters.common.onlineMode) {

        elog.notice('mock mode : on');

        callback(teamMock.challenger5);
        return;
    }


    // get region from session
    var options = {
        uri: parameters.riotApi.url.byLeagueChallenger,
        region: region,
        query: {
            'type': 'RANKED_TEAM_5x5'
        }
    };

    webService.call(options, function (challengerLadder) {

        var ladder = _.omit(challengerLadder, 'entries');
        list = _.sortBy(challengerLadder.entries, 'leaguePoints');
        ladder.entries = list.reverse();

        callback(ladder);
    });
};
