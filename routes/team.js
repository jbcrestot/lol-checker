var express = require('express');
var router = express.Router();

/* GET users listing. */
router
    .get('/', function(req, res) {
        return res.redirect('/team/ladder');
    })
    .get('/ladder', function() {
        /**
         * on part d'un joueur et on récupère l'ensemble des ces équipes
         * /team/by-summoner/{id}
         * ex.: nono : 4 teams
         * on sauvegarde chaque team avec ses joueurs
         * chaque joueur est sauvegardé dans une table temp, s'il n'est pas déja connu dans user
         * 
         */
        
        return res.render('team/ladder.html');
    })
    ;

module.exports = router;
