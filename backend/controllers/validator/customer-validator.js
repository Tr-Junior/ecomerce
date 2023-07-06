const mongoose = require("mongoose");
const { validate, ValidationError, Joi } = require('express-validation');

const Customer = mongoose.model("Customer");

const CustomerValidator = {
    index: {
        query: Joi.object({
            offset: Joi.number(),
            limit: Joi.number(),
            store: Joi.string().alphanum().length(24).required()
        })
    },
    search: {
        query: Joi.object({
            offset: Joi.number(),
            limit: Joi.number(),
            store: Joi.string().alphanum().length(24).required()
        }),
        params: Joi.object({
            search: Joi.string().required()
        })

    },
    showAdmin: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })

    },
    updateAdmin: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            document: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phone: Joi.array().items(Joi.string()).optional(),
            address: Joi.object({
                locale: Joi.string().required(),
                number: Joi.string().required(),
                complement: Joi.string(),
                neighborhood: Joi.string().required(),
                city: Joi.string().required(),
                zipCode: Joi.string().required(),
            }).optional(),
            birthDate: Joi.date().iso().optional()
        }),
    },
    show: {
        query: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        })
    },
    store: {
        query: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            name: Joi.string().required(),
            password: Joi.string().required(),
            document: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.array().items(Joi.string()).required(),
            address: Joi.object({
                locale: Joi.string().required(),
                number: Joi.string().required(),
                complement: Joi.string(),
                neighborhood: Joi.string().required(),
                city: Joi.string().required(),
                zipCode: Joi.string().required(),
            }).required(),
            birthDate: Joi.date().iso().required()
        }),
    },
    update: {
        query: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            password: Joi.string().optional(),
            document: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phone: Joi.array().items(Joi.string()).optional(),
            address: Joi.object({
                locale: Joi.string().required(),
                number: Joi.string().required(),
                complement: Joi.string(),
                neighborhood: Joi.string().required(),
                city: Joi.string().required(),
                zipCode: Joi.string().required(),
            }).optional(),
            birthDate: Joi.date().iso().optional()
        }),
    },

};

module.exports = { CustomerValidator };