const {sendMessage} = require('../slack/slack.service');


class ExpectedError extends Error {
    constructor(name, status, message, code = -1) {
        // Needs to pass both `message` and `options` to install the "cause" property.
        super(message);
        this.name = name;
        this.status = status;
        this.code = code;
    }

    toJSON() {
        return ErrorResponseBody(this.code, this.name, this.message);
    }
}


class UnexpectedError extends Error {
    constructor(name, status, message, code = -1) {
        // Needs to pass both `message` and `options` to install the "cause" property.
        super(message);
        this.name = name;
        this.status = status;
        this.code = code;
    }

    toJSON() {
        return ErrorResponseBody(this.code, this.name, this.message);
    }
}


/**
 * Where we are handle expected errors
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function UnExpectedErrorMiddleware(err, req, res, next) {
    console.log("UnExpectedErrorMiddleware");
    console.log(err.message);
    sendMessage(err.message);
    res.status(500).json(ErrorResponseBody(-1, err.name, err.message));
}

/**
 * Where we log/store/output the error
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function LogErrorMiddleware(err, req, res, next) {
    next(err);
}


function ClientErrorMiddleware(err, req, res, next) {
    if (req.xhr) {
        res.status(500).json(ErrorResponseBody(500, err.name, err.message));
        return;
    }

    if (err instanceof ExpectedError) {
        res.status(err.status).json(err.toJSON());
        return;
    }

    next(err);
}

function NotFoundMiddleware(req, res, next) {
    return res
        .status(404)
        .json(ErrorResponseBody(500, "Not Found", `${req.protocol}://${req.get('host')}${req.originalUrl} not found`));
}

function ErrorResponseBody(code, error, description) {
    return {
        code,
        error,
        description
    }
}



function SuccessResponseBody(code, message, data) {
    return {
        code,
        message,
        data
    }
}

function BadRequest(msg = "BadRequest", errorCode = -1) {
    return new ExpectedError("BadRequest", 400, msg, errorCode);
}


function ValidationException({
    message = "ValidationException",
    errorField = "",
    errorCode = -1
}) {
    return new ExpectedError("ValidationException", 400, message, errorCode);
}


function Unauthorized(msg = "Unauthorized", errorCode = -1) {
    return new ExpectedError("Unauthorized", 401, msg, errorCode);
}


function Forbidden() {
    return new ExpectedError("Forbidden", 403, "You don't have permission for this");
}


function Ok(res, data) {
    res.send(SuccessResponseBody(200, "", data));
}


function Created() {

};




module.exports = {
    NotFoundMiddleware,
    LogErrorMiddleware,
    ClientErrorMiddleware,
    UnExpectedErrorMiddleware,


    UnexpectedError,

    Ok,
    Created,
    BadRequest,
    Forbidden,
    Unauthorized,
    ValidationException,
}