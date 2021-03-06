var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var _ = require("underscore");

var routes = require('./routes/index.js');
var user = require('./routes/user.js');
var team = require('./routes/team.js');
var parameters = require('./parameters.js');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/team')]);
app.set('view engine', 'swig');
app.engine('html', require('swig').renderFile);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'f5')));
//add this so the browser can GET the bower files
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(session(parameters.session));
// basic setup of region
app.use(function(req, res, next) {
    if (_.isUndefined(req.session.region)) {
        req.session.region = 'euw';
    }
    next();
})

app.use('/', routes);
app.use('/user', user);
app.use('/team', team);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
