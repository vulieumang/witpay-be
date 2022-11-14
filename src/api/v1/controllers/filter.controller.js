const router = require('express').Router();
const {
    asyncWrapper
} = require('../utils/general.uti');

const filterService = require('../services/filter.service');
const { AuthenticationMiddleware } = require('../services/auth.service');



/**
 * Get filters
 *  */
router.get('/',
    AuthenticationMiddleware,
    asyncWrapper(async function (request) {
        return await filterService.GetFilters(request.userIdentity._id);
    }));



/**
 * Create filter
 *  */
router.post('/',
    AuthenticationMiddleware,
    asyncWrapper(async function (request) {
        return await filterService.CreateFilter(request.userIdentity._id, request.body);
    }));


/**
 * Update filter
 * 
 */
router.put('/',
    AuthenticationMiddleware,
    asyncWrapper(async function (request) {   
        return await filterService.UpdateFilter(request.userIdentity._id, request.body);
    }));

/**
 * Update filter
 * 
 */
router.delete('/:filterId',
    AuthenticationMiddleware,
    asyncWrapper(async function (request) {
        return await filterService.UpdateFilter(request.userIdentity._id, request.params.filterId);
    }));


    



module.exports = router;