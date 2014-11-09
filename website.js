var http = require('http'),
    util = require('util'),
    config = require('npcp'),
    app = require('./server/app'),
    log = require('./server/lib/logger').getLogger(),
    numCPUs = require('os').cpus().length,
    respawn = true,
    cluster;

try {
    cluster = require('cluster');
} catch (err) {
    log.error('cluster module not available, running single process');
}

/**
 * Shutdown signal handler
 *
 * @return {null}
 */
function terminate() {
    log.debug('Terminating %d workers', Object.keys(cluster.workers).length);
    respawn = false;

    // destroy all workers
    for (var id in cluster.workers) {
        if (cluster.workers.hasOwnProperty(id)) {
            cluster.workers[id].destroy();
        }
    }
    process.exit(0);
}

if (config.enableCluster === 'true' && cluster && cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('fork', function (worker) {
        log.debug(util.format('Spawned new worker (%d)', worker.process.pid));
    });

    cluster.on('listening', function (worker, address) {
        log.debug(util.format(
            'Worker (%d) is connected to %s:%d',
            worker.process.pid,
            address.address,
            address.port));
    });

    cluster.on('exit', function (worker, code, signal) {
        log.debug(util.format(
            'Worker (%d) died (%d, %s)',
            worker.process.pid,
            worker.process.exitCode,
            signal));

        if (respawn) {
            cluster.fork();
        }
    });

    if (process.platform !== 'win32') {
        process.once('SIGTERM', terminate);
        process.once('SIGINT', terminate);
        process.once('SIGQUIT', terminate);
    }
} else {
    var server = http.createServer(app),
        addr;

    server.listen(config.port, config.ip, function () {
        addr = server.address();
        log.debug('Server listening at %s:%s', addr.address, addr.port);
    });
}

//Catch all uncaught exceptions, output the error, and exit.
process.on('uncaughtException', function (err) {
    log.error('uncaughtException:', err.stack);
    log.error(err.stack);
    process.exit(1);
});
