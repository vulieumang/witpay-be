const { Schema, model, Error: MongooseError } = require('mongoose');


class BaseSchemaFragment {
    constructor({ structure, middleware }) {
        this._structure = structure;
        this._middleware = middleware;
    }

    get structure() {
        return this._structure;
    };

    get middleware() {
        return this._middleware;
    }
}


class AuditSchemaFragment extends BaseSchemaFragment {
    constructor() {
        super({
            structure: {
                createdDate: {
                    type: Date,
                    required: true,
                    default: Date.now
                },
                lastModifiedDate: {
                    type: Date,
                    required: true,
                    default: Date.now
                },
            },
            middleware: function(schema) {
                schema.pre('update', function() {
                    this.lastModified = Date.now;
                });
            }
        });
    }
}


class SoftDeleteSchemaFragment extends BaseSchemaFragment {
    constructor() {
        super({
            structure: {
                isDeleted: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                deletedDate: {
                    type: Date,
                    default: null
                }
            },
            middleware: function(schema) {
                schema.pre('update', function() {
                    this.lastModified = Date.now;
                });
            }
        });
    }
}


function mongooseErrorHandle(err, doc, next) {
    if (err instanceof MongooseError.ValidationError) {
        throw err;
    } else {
        throw err;
    }
};



function BuildSchema(schemaStructure, ...fragments) {
    fragments.forEach(fragment => {
        if (fragment instanceof BaseSchemaFragment) {
            schemaStructure = {...schemaStructure, ...fragment.structure }
        }

    });

    const schema = new Schema(schemaStructure);

    fragments.forEach(fragment => {
        if (fragment instanceof BaseSchemaFragment) {
            fragment.middleware(schema);
        }
    });

    schema.post('save', mongooseErrorHandle);

    return schema;
}


module.exports = {
    SoftDeleteSchemaFragment,
    AuditSchemaFragment,
    BuildSchema,
}