const { model, Error: MongooseError, mongoose } = require('mongoose');
const {
    SoftDeleteSchemaFragment,
    AuditSchemaFragment,
    BuildSchema
} = require('../utils/mongoose.uti');

const transactionSchema = BuildSchema({
        gateway: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true
        },
        dateMilisecond: {
            type: Number, 
            required: true,
        },
        refNumber: {
            type: String,
            required: true,
        },
        accNumber: {
            type: String,
        },
        desc: {
            type: String
        },
        debit: {
            type: Number
        },
        credit: {
            type: Number
        },
        fee: {
            type: Number
        },
        vat: {
            type: Number
        },
        balance: {
            type: Number,
            required: true,
        },
        orderCode: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
    },
    new AuditSchemaFragment());


module.exports = model('transactions', transactionSchema);