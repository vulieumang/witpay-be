const apiVersion = '/api/v1';
const transactionController = require('./controllers/transation.controller');
const userController = require('./controllers/user.controller');
const filterController = require('./controllers/filter.controller');
module.exports = function(appExpress) {
    appExpress.use(`${apiVersion}/transactions`, transactionController);
    appExpress.use(`${apiVersion}/users`, userController);
    appExpress.use(`${apiVersion}/filters`, filterController);
}   