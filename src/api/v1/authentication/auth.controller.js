const express = require('express')
const router = express.Router();
const { RegisterAsync, LoginAsync } = require('./auth.service');
const { asyncWrapper } = require('../utils/general.uti');

router.post('/register', asyncWrapper(async function(uri, body) {
    await RegisterAsync(body);
}));


router.post('/login', asyncWrapper(async function(uri, body) {
    return await LoginAsync(body);
}));



module.exports = router;