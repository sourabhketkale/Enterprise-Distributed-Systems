var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');

var app = express();

app.use(session({

    cookieName: 'session',
    secret: 'cmpe273_test_string',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));


var routes = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var redirecting = require('./routes/redirecting');
var signinoperation = require('./routes/signin');
var registerooperation = require('./routes/register');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.get('/users', users);
app.get('/dashboard', redirecting.gotodashboard);
app.get('/signin', redirecting.gotosignin);
app.post('/login', signinoperation.signincheck);
app.get('/signup', redirecting.gotosignup);
app.post('/register', registerooperation.register);
app.get('/index', redirecting.gotoindex);
app.post('/dashboard', dashboard.inserttweet);
app.get('/followinglist', dashboard.followinglist);
app.get('/followerlist', dashboard.followerlist);
app.get('/profile', redirecting.gotoprofile);
app.get('/gotoprofile', redirecting.getsessionfromdashboardtoprofile);
app.get('/dashboardredirect', redirecting.dashboardredirection);
app.post('/tweetprofile', dashboard.allfollowingtweets);
app.get('/getallusertweets', dashboard.allfollowingtweets);
app.post('/addtofollow', dashboard.addtofollow);
app.get('/signout', redirecting.signout);
/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//session handler configuration
app.use(session({
    cookieName: 'session',
    secret: 'CMPE_273_k2',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    resave: false,
    saveUninitialized: true,

    httpOnly: true,
    secure: true,
    ephemeral: true
}));

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
