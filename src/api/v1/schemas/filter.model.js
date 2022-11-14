const {
    model,
    mongoose
} = require('mongoose');

const {
    AuditSchemaFragment,
    BuildSchema
} = require('../utils/mongoose.uti');


const filterRulePartSchema = BuildSchema({
    value: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['string', 'number', 'specialCharacter'],
    },
    minAmountNumber: {
        type: Number,
        required: true,
        default: 1
    },
    maxAmountNumber: {
        type: Number,
        required: true,
        default: 1
    },
});

const filterRuleSchema = BuildSchema({
    parts: {
        type: [filterRulePartSchema],
        default: []
    },
    removeChars: [String],
    regexStr: String
});


const filterSchema = BuildSchema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        rules: {
            type: [filterRuleSchema],
            default: []
        }
    },
    new AuditSchemaFragment());

filterSchema.index({
    userId: 1,
    title: 1
}, {
    unique: true
});



module.exports = model('filter', filterSchema);