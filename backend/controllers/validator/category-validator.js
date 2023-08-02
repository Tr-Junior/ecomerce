const mongoose = require("mongoose");
const { validate, ValidationError, Joi } = require('express-validation');

const Category = mongoose.model("Customer");

const CategoryValidator = {
    index: {
        query: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        })
    },
    indexDisponibility: {
        query: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        })
    },
    show: {
        query: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        }),
        params: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        })
    },
    store: {
        body: Joi.object({
            name: Joi.string().required(),
            code: Joi.string().required()
        }),
    },
    update: {
        params: Joi.object({
            store: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            code: Joi.string().optional(),
            disponibility: Joi.boolean().optional(),
            products: Joi.array().items(Joi.string().alphanum().length(24).required()),
        }),
    },
    remove: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
    }
};

module.exports = { CategoryValidator };