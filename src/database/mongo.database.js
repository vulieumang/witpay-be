const mongoose = require('mongoose');
const config = require('../config/env');


function start() {
    mongoose.connect(config.DB_CONN_STR, { useNewUrlParser: true });
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.on('connected', function() {
        console.info('Connected MongoDB - ' + config.DB_CONN_STR);
    });
    mongoose.connection.on('disconnected', function() {
        console.info('Disconnected MongoDB');
    });
}

module.exports = {
    start: start
}