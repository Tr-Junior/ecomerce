const mongoose = require("mongoose");
const { validate, ValidationError, Joi } = require('express-validation');

const User = mongoose.model("User");
const Store = mongoose.model("Store");

const StoreValidator = {
    admin: (req, res, next) => {
        if (!req.payload.id) return res.sendStatus(401);
        const { store } = req.query;
        if (!store) return res.sendStatus(401);
        User.findById(req.payload.id)
            .then(user => {
                if (!user) return res.sendStatus(401);
                if (!user.store) return res.sendStatus(401);
                if (!user.permission.includes("admin")) return res.sendStatus(401);
                if (user.store.toString() !== store) return res.sendStatus(401);
                next();
            })
            .catch(next);
    },
    show: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })
    },
    store: {
        body: Joi.object({
            name: Joi.string().required(),
            cnpj: Joi.string().length(18).required(),
            email: Joi.string().email().required(),
            phone: Joi.array().items(Joi.string()).required(),
            address: Joi.object({
                locale: Joi.string().required(),
                number: Joi.string().required(),
                complement: Joi.string().optional(),
                neighborhood: Joi.string().required(),
                city: Joi.string().required(),
                zipCode: Joi.string().required(),
            }).required()
        })
    },
    update: {
        body: Joi.object({
            name: Joi.string().optional(),
            cnpj: Joi.string().length(18).optional(),
            email: Joi.string().email().optional(),
            phone: Joi.array().items(Joi.string()).optional(),
            address: Joi.object({
                locale: Joi.string().optional(),
                number: Joi.string().optional(),
                complement: Joi.string().optional(),
                neighborhood: Joi.string().optional(),
                city: Joi.string().optional(),
                zipCode: Joi.string().optional(),
            }).optional()
        })
    },
};

module.exports = { StoreValidator };
