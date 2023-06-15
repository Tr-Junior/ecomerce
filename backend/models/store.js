const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    phone: {
        type: [{ type: String }]
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
}, { timestamps: true })

StoreSchema.plugin(uniqueValidator, { message: 'já está sendo utilizado' });


module.exports = mongoose.model('Store', StoreSchema);