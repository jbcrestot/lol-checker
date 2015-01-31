var redis = require('redis'),
    clc = require('cli-color'),
    orange = clc.xterm(208),
    client = redis.createClient(),
    _ = require('underscore');
    
    redis.debug_mode = false;


exports.save = function(team) {
    redisLog( orange('{teamRepository:save} ')+ 'save user:'+ team.id +' '+ JSON.stringify( team ) );
    // on sauvegarde pour notre référentiel d'équipe
    client.hset('team', team.name.toLowerCase(), team.id);
    // on sauvegarde les data de l'équipe
    client.hmset('team:'+team.id, team) ;
};

exports.get = function(userName, callback) {
    client.hget(['user', userName.toLowerCase()], function(err, reply) {
        // reply is null when the key is missing
        redisLog( orange('{teamRepository:get} ') + 'get user '+ userName +' : '+ (_.isNull(reply) ? 'not found' : 'found with id '+ reply) );
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
