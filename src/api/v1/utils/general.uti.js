const {
    Ok,
    UnexpectedError
} = require('../utils/response.uti');
const slackService = require('../slack/slack.service');

function asyncWrapper(func) {
    return function (req, res, next) {
        Promise
            .resolve(func(req))
            .then(function (data) {
                Ok(res, data);
            })
            .catch(next);
    }
};


function asyncDALWrapper(f) {
    return function () {
        const args = arguments;
        return new Promise((resolve, reject) => {
            f(...args)
                .then(function (result) {
                    resolve(result);
                })
                .catch(function (err) {
                    console.log(err);
                    slackService.sendMessage(JSON.stringify(err));

                    if (err.sql) {
                        reject(new UnexpectedError("DatabaseError", err.code, "Database error"));
                    } else {
                        reject(new UnexpectedError("UnexpectedError", 500, "Database error"));
                    }
                });

        });
    }

}


module.exports = {
    asyncWrapper,
    asyncDALWrapper
};