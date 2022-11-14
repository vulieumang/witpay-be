const express = require('express');
const router = express.Router();
const { GetUserByUserId,CreateUserAsync } = require('../services/user.service');
const {
    AuthenticationMiddleware,
    LoginAsync
} = require('../services/auth.service');
const { asyncWrapper } = require('../utils/general.uti');


router.get('/:id', 
AuthenticationMiddleware, 
asyncWrapper(async function({ id }, body) {
    return await GetUserByUserId(id);
}));


router.post('/', asyncWrapper(async function (request) {
    await CreateUserAsync(request.body);
    return ;
}));


router.post('/token', asyncWrapper(async function (request) {
    return await LoginAsync(request.body);
}));


module.exports = router;