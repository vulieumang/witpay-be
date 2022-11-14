const User = require('../schemas/user.model');
const {
    ValidationException,
    HashString,
    CompareHashString,
    Unauthorized,
    Forbidden
} = require('../utils/index');

const Ensure = require('../utils/ensure.uti');
/**
 * Create new user
 * @param {*} register data 
 */
exports.CreateUserAsync = async function({ username, password, phone, email, fullName } = {}) {
    Ensure.StringIsNotEmpty(username, 'Username');
    Ensure.StringMinLength(username, 3, 'Username');
    Ensure.StringMaxLength(username, 20, 'Username');
    Ensure.StringIsNotEmpty(password, 'Password');
    Ensure.StringIsNotEmpty(phone, 'Phone');

     const {
         hashString,
         salt
     } = HashString(password);

    return await User.create({
        username,
        hashPassword: hashString,
        salt,
        phone,
        email,
        fullName,
        userType: "Client"
    });
}

/**
 * Get user by user name
 * @param {*} userName 
 * @returns The User
 */
exports.GetUserByUserNameAsync = async function(userName) {
    return await User.findOne({ userName });
}

/**
 * Get user by user id
 * @param {*} userId 
 * @returns The User
 */
exports.GetUserByUserId = async function(userId) {
    return await User.findOne({ _id: userId });
}