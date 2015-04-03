// application
var parameters = require('../parameters.js'),
    webService = require('../business/webService.js');

exports.getChallenger = function (region, type, callback) {
//    mock
//    var a = {"undefined":{"id":19897772,"name":"Undefined","profileIconId":692,"summonerLevel":30,"revisionDate":1410898743000}}; callBack(a); return ;

    var options = {
            json: true,
            method: 'GET',
            uri: 'https://' + parameters.riotApi.url.host + parameters.riotApi.url.base + region +
                    parameters.riotApi.url.byLeagueChallenger +
                    '?type='  + type+
                    '&api_key=' + parameters.riotApi.key
        };

    webService.call(options, callback);
};
