/**
 * We will define all setup/configuration relates to the application to app file
 *
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const apiRouterVersion1 = require('./api/v1/apiRouter');
const {
    NotFoundMiddleware,
    LogErrorMiddleware,
    ClientErrorMiddleware,
    UnExpectedErrorMiddleware
} = require('./api/v1/utils/response.uti');

/* Support parse request body to JSON middleware layers */
app.use(bodyParser.json({
    limit: '50mb'
}));

/* Support CORS middleware layers */
app.use(cors());


/* Setup app router version 1 middleware layers */
apiRouterVersion1(app);


/* Setup Error handle middleware layers */
app.use(NotFoundMiddleware);
app.use(LogErrorMiddleware);
app.use(ClientErrorMiddleware);
app.use(UnExpectedErrorMiddleware);


/** Just a simple Test */
app.get('/test', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;