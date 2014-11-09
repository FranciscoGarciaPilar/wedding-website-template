/**
 * This setups the logger for the application
 * @type {Logger|exports|*}
 */
var bunyan = require('bunyan'),
    package_name = process.env.npm_package_name,
    logPath = process.env.npm_package_config_logPath,
    logLevel = process.env.npm_package_config_logLevel,
    logger = bunyan.createLogger({
        name: package_name,
        streams: [
            {
                stream: process.stderr,
                level: 'debug'
            },
            {
                level: 'error',
                path: logPath + package_name + '-error.log' // log ERROR and above to a file
            },
            {
                level: logLevel,
                path: logPath + package_name + '.log' // log ERROR and above to a file
            }
        ]
    });

//Handle the logger failing
logger.on('error', function (err) {
    console.log('Logger was not started correctly.  Is the wedding-website:logPath variable set in npm?');
    console.log('Error: %s', err.stack);
    process.exit(1);
});

logger.debug('Logger Started');

exports.getLogger = function () {
    return logger;
};
