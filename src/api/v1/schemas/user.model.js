const { Schema, model, Error: MongooseError } = require('mongoose');
const {
    AuditSchemaFragment,
    BuildSchema
} = require('../utils/mongoose.uti');

const userSchema = BuildSchema({
        email: {
            type: String,
            //required: true,
        },
        emailLowerCase: {
            type: String,
            //required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        salt: {
            type: String,
            required: true,
        },
        hashPassword: {
            type: String,
            required: true,
        },
        phone: { type: String },
        fullName: {type : String},
        userType: {
            type: String
        }
    },
    new AuditSchemaFragment());


const userModel = model('users', userSchema);

module.exports = userModel;