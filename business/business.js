// application
var parameters = require('../parameters.js'),
    webService = require('../business/webService.js');

exports.getSummoner = function (region, summonerName, callBack) {
//    mock
//    var a = {"undefined":{"id":19897772,"name":"Undefined","profileIconId":692,"summonerLevel":30,"revisionDate":1410898743000}}; callBack(a); return ;

    var path = parameters.riotApi.url.base + region +
            parameters.riotApi.url.bySummonerName +
            encodeURIComponent(summonerName) + '?api_key=' + parameters.riotApi.key,
        options = {
            host: parameters.riotApi.url.host,
            port: 80,
            path: path,
            method: 'GET'
        };

    webService.call(summonerName, options, callBack);
};