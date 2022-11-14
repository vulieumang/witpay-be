const http = require('http');
const debug = require('debug')('node:server');
const database = require('./src/database/mongo.database');
const config = require('./src/config/env');
const port = config.SERVERPORT || '3000';
config.SetRootDir(__dirname);


async function main() {
    
    /**
     * Start Database.
     */
    await database.start();

    
    /**
     * Create HTTP server.
     */
    const app = require('./src/app');
    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ?
            'Pipe ' + port :
            'port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string' ?
            'pipe ' + addr :
            'port ' + addr.port;
        debug('Listening on ' + bind);
        console.info("Server running at port " + addr.port);

    }
}

(async () => {
    await main();
})();

