const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
const { string } = require('joi');
const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    document: {
        type: String,
        required: true,
    },
    phone: {
        type: [
            { type: String }
        ],
    },
    deleted: {
        type: Boolean,
        default: false
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    address: {
        type: {
            locale: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            },
            complement: {
                type: String
            },
            neighborhood: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            zipCode: {
                type: String,
                required: true,
            },
        },
        required: true
    }
}, { timestamps: true });

CustomerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Customer', CustomerSchema);
