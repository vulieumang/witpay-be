const router = require('express').Router();
const {
    asyncWrapper
} = require('../utils/general.uti');

const {
    CreateTransactions,
    FindTransactionsByRefNums,
    GetTransactions
} = require('../services/transaction.service');
const { AuthenticationMiddleware } = require('../services/auth.service');





/**
 * Find transactions by RefNums
 *  */
router.get('/',
    AuthenticationMiddleware,
    asyncWrapper(async function (request) {
        return await GetTransactions(request.userIdentity._id);
    }));



/**
 * Find transactions by RefNums
 *  */
router.post('/findByRefNums',
    AuthenticationMiddleware,
    asyncWrapper(async function (request) {
        
        return await FindTransactionsByRefNums(request.userIdentity._id, request.body);
    }));


/**
 * Create transactions
 * 
 */
router.post('/',
    AuthenticationMiddleware,
    asyncWrapper(async function (request) {   
        return await CreateTransactions(request.userIdentity._id, request.body);
    }));

    



module.exports = router;