const jwt = require("jsonwebtoken");
const User = require('../schemas/user.model');
const {
    ValidationException,
    HashString,
    CompareHashString,
    Unauthorized,
    Forbidden
} = require('../utils/index');

const Ensure = require('../utils/ensure.uti');
const JWT_LOGIN_TOKEN_DURATION = '8h';
const JWT_LOGIN_TOKEN_SECRECT = 'secret';

const JWT_REFRESH_TOKEN_DURATION = '5d';
const JWT_REFRESH_TOKEN_SECRECT = 'secret';


function GetLoginToken(obj) {
    return jwt.sign(obj,
        JWT_LOGIN_TOKEN_SECRECT, {
            expiresIn: JWT_LOGIN_TOKEN_DURATION
        });
}

function GetRefreshToken(obj) {
    return jwt.sign(obj,
        JWT_REFRESH_TOKEN_SECRECT, {
            expiresIn: JWT_REFRESH_TOKEN_DURATION
        });
}


/**
 * Authentication Middleware that make sure the request contain correct authentication token
 */
function AuthenticationMiddleware(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader)
        throw new Unauthorized();

    const [authType, authToken] = authorizationHeader.split(' ');
    if (!authToken)
        throw new Unauthorized();

    try {
        req.userIdentity = jwt.verify(authToken, JWT_LOGIN_TOKEN_SECRECT);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Unauthorized("Token Expired", 401);
        }

        throw new Unauthorized("Invalid Token");
    }

    next();
}


/**
 * Login
 * @param {*} login data 
 * @returns Found User
 */
async function LoginAsync({
    userName,
    password
} = {}) {

    Ensure.StringIsNotEmpty(userName, 'username');
    Ensure.StringIsNotEmpty(password, 'password');

    const foundUser = await User.findOne({
        userName: userName
    }).exec();

    Ensure.IsNotNullOrUndefined(foundUser, 'username', 'Username is incorrect');

    if (!CompareHashString(foundUser.hashPassword, password, foundUser.salt)) {
        throw new ValidationException({
            message: "Password is incorrect",
            errorField: 'password'
        });
    }

    const tokenInfo = {
        _id : foundUser._id,
        userName: foundUser.userName,
        userType: foundUser.userType,
        fullName: foundUser.fullName,
    }

    const token = GetLoginToken(tokenInfo);
    const refreshToken = GetRefreshToken(tokenInfo);

    return {
        ...tokenInfo,
        token,
        refreshToken
    };
}


module.exports = {
    LoginAsync,
    AuthenticationMiddleware
}