var util = require('util'),
    domain = require('domain'),
    os = require('os'),
    config = require('npcp'),
// 3rd-party libraries
    express = require('express'),
    app = express(),
    consolidate = require('consolidate'),
    log = require('./lib/logger').getLogger(),
// Custom route libraries
    routes = require('./lib/routes')

if (!config.env || (config.env === 'REPLACE_ME')) {
    log.error('Run: npm config -g set wedding-website:env "YOUR ENVIRONMENT"');
    process.exit(1);
} else {
    process.env.NODE_ENV = config.env;
}

app.engine('.ejs', consolidate.ejs);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public', {
    'maxAge': 604800000
}));

var environment = config.environments[config.env];
log.debug('Using ' + config.env + ' configuration');
app.set('staticCssUrl', environment.staticCssUrl);
app.set('staticJsUrl', environment.staticJsUrl);
app.set('staticImgUrl', environment.staticImgUrl);
app.set('staticBowerUrl', environment.staticBowerUrl);
app.set('minified', environment.minified);
app.set('googleAnalytics', environment.googleAnalytics);

// Error handling middleware that returns JSON
app.use(function (err, req, res, next) {
    var headers = {},
        status = 500;

    if (err.hasOwnProperty('headers')) {
        headers = err.headers;
    }

    if (err.hasOwnProperty('status')) {
        status = parseInt(err.status, 10);
    }

    return res.json({
        'error': err.message
    }, headers, status);
});

app.use(function (req, res, next) {
    var d = domain.create();
    d.on('error', function (err) {
        // alternative: next(err)
        res.statusCode = 500;
        res.end(err.message + '\n');
        log.error(err.stack);
        d.dispose();
    });
    d.enter();
    next();
});

app.use(function (req, res, next) {
    //This is added to the variables accessible by the template engine.
    res.locals = {
        env: config.env,
        staticCssUrl: app.get('staticCssUrl'),
        staticJsUrl: app.get('staticJsUrl'),
        staticImgUrl: app.get('staticImgUrl'),
        staticBowerUrl: app.get('staticBowerUrl'),
        minified: app.get('minified'),
        googleAnalytics: app.get('googleAnalytics')
    };
    next();
});

app.get('/', routes.landing);
app.get('/daysleft', routes.daysLeft);
app.get('/home', routes.main);
app.get('/howwemet', routes.main);
app.get('/proposal', routes.main);
app.get('/event', routes.main);
app.get('/weddingparty', routes.main);
app.all('*', routes.error404);

module.exports = app;
