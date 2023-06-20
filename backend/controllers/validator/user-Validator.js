const { validate, ValidationError, Joi } = require('express-validation');

const UserValidation = {
    show: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })
    },
    store: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            store: Joi.string().alphanum().length(24).required()
        }).required()
    },
    update: {
        body: Joi.object({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().optional()
        }).required()
    },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }).required()
    }
};

module.exports = { UserValidation };
