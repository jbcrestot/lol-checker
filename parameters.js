/**
 * This file expose application parameters
 * @type {exports}
 */
var config = require('./config.json')

// API parameters use to format address to reach
exports.riotApi = {
    key: config.riotApiKey,
    url : {
        host: 'euw.api.pvp.net',
        base: '/api/lol/',
        bySummonerName: '/v1.4/summoner/by-name/',
        byLeagueChallenger: '/v2.5/league/challenger'
    }, region: [
        'euw',
        'na'
    ]
};

// session parameters
exports.session = {
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
};

// common parameters
exports.common = {
    onlineMode: true
};