var express = require('express');
var router = express.Router();

var ritApiKey = '00ea28b2-19ab-4b5c-bb52-9812963e8907';

/* GET home page. */
router
    .get('/', function(req, res) {
        res.render('index.html', { title: 'Express' });
    })
    .get('/user/:userName', function(req, res) {
        
        console.log(req.userName);
        res.render('user.html', { userName: req.userName });
    })
    
;

module.exports = router;
