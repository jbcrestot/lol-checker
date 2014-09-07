var express = require('express');
var router = express.Router();
var parameters = require('parameters.js');

/* GET home page. */
router
    .get('/', function(req, res) {
        res.render('index.html', { title: 'Express' });
    })
    // mandatory for riot API
    .get('riot.html', function(req, res) {
        res.render('riot.html');
    })
    
    .get('/user/:userName', function(req, res) {
        
        console.log(req.userName);
        res.render('user.html', { userName: req.userName });
    })
    
;

module.exports = router;
