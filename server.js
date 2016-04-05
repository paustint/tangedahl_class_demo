(function(){
    'use strict';
    try {
        require('dotenv').load();
    } catch (e) {
        console.log('Error loading .env file. No environment variables loaded');
    }

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var bodyParser = require('body-parser');

    var routes = require('./serverController');

    var app = express();
    app.set('port', process.env.PORT || 3000);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'node_modules')));
    app.use(express.static(path.join(__dirname, 'client')));

    app.use('/api', routes);

    // default all trafiic to index.html
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, 'client', 'index.html'));
    });

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
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });


    module.exports = app;

})();
