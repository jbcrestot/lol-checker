var express = require('express');
var router = express.Router();

/* GET users listing. */
router
    .get('/', function(req, res) {

        return res.redirect('/team/ladder');
    })
    .get('/ladder', function(req, res) {

        return res.render('ladder.html');
    })
    ;

module.exports = router;
