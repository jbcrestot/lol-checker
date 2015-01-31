var redis = require('redis'),
    clc = require('cli-color'),
    orange = clc.xterm(208),
    client = redis.createClient(),
    _ = require('underscore');
    
    redis.debug_mode = false;

/**
 * 
 * @param {obj} user {
 *  id
 *  name
 *  profileIconId
 *  summonerLevel
 *  revisionDate
 * }
 * @returns {undefined}
 */
exports.save = function(user) {
    redisLog( orange('{userRepository:save} ')+ 'save user:'+ user.id +' '+ JSON.stringify( user ) );
    // on sauvegarde pour notre référentiel d'utilisateur
    client.hset('user', user.name.toLowerCase(), user.id);
    // on sauvegarde les data de l'utilisateurs
    client.hmset('user:'+user.id, user) ;
};

exports.get = function(userName, callback) {
    client.hget(['user', userName.toLowerCase()], function(err, reply) {
        // reply is null when the key is missing
        redisLog( orange('{userRepository:get} ') + 'get user '+ userName +' : '+ (_.isNull(reply) ? 'not found' : 'found with id '+ reply) );
        // sinon replay renvoie probablement l'id dans ce cas
        callback(reply);
    });
};

var redisLog = function(message){
    console.log(clc.blue('[redis] ') + message);
};

/**
 * HMSET
 * 
 * redis> HMSET myhash field1 "Hello" field2 "World"
 * redis> HGET myhash field1
 * "Hello"
 * redis> HGET myhash field2
 * "World"
 */
