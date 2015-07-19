// application
var parameters = require('../parameters.js'),
    webService = require('../business/webService.js');

/**
 * Classement des équipes challenger 5v5
 * @param region
 * @param type
 * @param callback
 */
exports.getChallenger5 = function (region, callback) {
//    mock
//    var a = {"undefined":{"id":19897772,"name":"Undefined","profileIconId":692,"summonerLevel":30,"revisionDate":1410898743000}}; callBack(a); return ;
    if (!parameters.common.onlineMode) {
        callback();

        return;
    }

    // get region from session
    var options = {
        uri: parameters.riotApi.url.byLeagueChallenger,
        region: region,
        query : {
            'type': 'RANKED_TEAM_5x5'
        }
    };

    webService.call(options, callback);
};
