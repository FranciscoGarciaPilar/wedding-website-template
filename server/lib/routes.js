var log = require('./logger').getLogger();

exports.main = function (req, res) {
    //Don't Cache the main page, this is attempting to fix the SSO issue.
    res.set('Cache-Control', 'no-cache');
    log.debug('Main render');
    res.render('main');
};

exports.landing = function (req, res) {
    res.set('Cache-Control', 'non-cache');
    log.debug('Rendering Landing Page');
    res.render('landing');
};

exports.daysLeft = function (req, res) {
    var bigDay = new Date('2014-10-12'),
        daysLeft = Math.floor((bigDay.getTime() - (new Date().getTime())) / (1000 * 60 * 60 * 24));
    res.set('Content-Type', 'application/json');
    res.send(200, {'daysLeft': daysLeft});
};

exports.error404 = function (req, res) {
    res.status(404);
    res.render('error');
};