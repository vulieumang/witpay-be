const bcrypt = require('bcryptjs');

function HashString(string) {
    const salt = bcrypt.genSaltSync(10);
    const hashString = bcrypt.hashSync(string, salt);
    return { salt, hashString };
}


function CompareHashString(hashString, string, salt) {
    return hashString == bcrypt.hashSync(string, salt);
}


module.exports = {
    HashString,
    CompareHashString
}