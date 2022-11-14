const { ValidationException } = require('./response.uti');


function IsNotNullOrUndefined(object, name, msg) {
    if (object === undefined || object === null) {
        throw new ValidationException({
            message: msg || `${name} is required`
        });
    }
}

function StringIsNotEmpty(string, name, msg) {
    if (!string) {
        throw new ValidationException({
            message: msg || `${name} is required`
        });
    }
}

function ArrayIsNotEmpty(arr, name, msg) {
    if (!Array.isArray(arr)) {
        throw new ValidationException({
            message: `${name} is not array`
        });
    }

    if (arr.length === 0) {
        throw new ValidationException({
            message: msg || `${name} is empty`
        });
    }
}

function StringMaxLength(string, maxLength, name = 'String') {
    if (typeof string !== 'string') {
        throw new ValidationException({
            message: `${name} is not a string`
        });
    }

    if (string.length > maxLength) {
        throw new ValidationException({
            message: `${name} max length is ${maxLength}`
        });
    }
}


function StringMinLength(string, minLength, fieldName = 'String', message) {
    if (typeof string !== 'string' || string.length < minLength) {
        throw new ValidationException({
            message: message || `${fieldName} is a string has min length is ${minLength}`
        });
    }
}

function NumberGreaterThan(number, minValue, fieldName, message) {
    if (isNaN(number) || number < minValue) {
        throw new ValidationException({
            message: message || `${fieldName} is a number has min value is ${minValue}`
        });
    }
}



module.exports = {
    IsNotNullOrUndefined,
    StringIsNotEmpty,
    ArrayIsNotEmpty,
    StringMaxLength,
    StringMinLength,

    NumberGreaterThan
}