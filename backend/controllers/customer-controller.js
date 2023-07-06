const mongoose = require('mongoose');
const customer = require('../models/customer');

const Customer = mongoose.model('Customer');
const User = mongoose.model('User');


class CustomerController {

    //GET / index
    async index(req, res, next) {
        try {
            const offset = Number(req.query.offset) || 0;
            const limit = Number(req.query.limit) || 30;
            const customer = await Customer.paginate(
                { store: req.query.store },
                { limit, offset, populate: { path: 'user', select: '-salt -hash' } }
            );
            return res.send({ customer });
        } catch (e) {
            next(e);
        }
    }


    searchOrders(req, res, next) {
        return res.status(400).send({ error: "Em desenvolvimento " })
    }

    //GET search/:search

    async search(req, res, next) {
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 30;
        const search = new RegExp(req.query.search, 'i');
        try {
            const customer = await Customer.paginate(
                { store: req.query.store, name: { $regex: search } },
                { limit, offset, populate: { path: 'user', select: '-salt -hash' } }
            );
            return res.send({ customer });
        } catch (e) {
            next(e);
        }
    }


    //GET /admin/:id

    async showAdmin(req, res, next) {
        try {
            const customer = await Customer.findOne({ _id: req.params.id, store: req.query.store }).populate('user');
            return res.send({ customer });
        } catch (e) {
            next(e);
        }
    }

    //PUT /admin/:id
    async updateAdmin(req, res, next) {
        const {
            name,
            document,
            email,
            phone,
            address,
            birthDate
        } = req.body;
        try {
            const customer = await Customer.findById(req.params.id).populate({ path: 'user', select: '-salt -hash' });
            if (name) {
                customer.user.name = name;
                customer.name = name;
            }
            if (email) customer.user.email = email;
            if (document) customer.document = document;
            if (phone) customer.user.phone = phone;
            if (address) customer.user.address = address;
            if (birthDate) customer.birthDate = birthDate;
            await customer.user.save();
            await customer.save();
            return res.send({ customer });
        } catch (e) {
            next(e);
        }
    }

    // CLIENTE

    async show(req, res, next) {
        try {
            const customer = await Customer.findOne(
                { user: req.params.id, store: req.query.store },
            ).populate({ path: 'user', select: '-salt -hash' });
            return res.send({ customer });
        } catch (e) {
            next(e);
        }
    }


    async store(req, res, next) {
        const {
            name,
            document,
            email,
            phone,
            address,
            birthDate,
            password
        } = req.body;
        const { store } = req.query;

        const user = new User({ name, email, store });
        user.setPassword(password);
        const customer = new Customer({
            name,
            document,
            email,
            phone,
            address,
            birthDate,
            user: user._id,
            store
        });
        try {
            await user.save();
            await customer.save();

            return res.send({
                customer: Object.assign(
                    {},
                    customer._doc,
                    {
                        email: user.email
                    })
            });
        } catch (e) {
            next(e);
        }
    }




    async update(req, res, next) {
        const {
            name,
            document,
            email,
            phone,
            address,
            birthDate,
            password
        } = req.body;
        try {
            const customer = await Customer.findOne({ user: req.params.id }).populate({ path: 'user', select: '-salt -hash' });
            if (!customer) return res.send({ error: "Cliente não encontrado" })
            if (name) {
                customer.user.name = name;
                customer.name = name;
            }
            if (email) customer.user.email = email;
            if (password) customer.user.password = password;
            if (document) customer.document = document;
            if (phone) customer.user.phone = phone;
            if (address) customer.user.address = address;
            if (birthDate) customer.birthDate = birthDate;
            await customer.save();
            customer.user = {
                email: customer.user.email,
                _id: customer.user._id,
                permission: customer.user.permission
            }
            res.send({ customer });
        }
        catch (e) {
            next(e);
        }
    }

    async remove(req, res, next) {
        try {
            const customer = await Customer.findOne({ user: req.payload.id }).populate('user');
            await customer.user.remove();
            customer.deleted = true;
            await customer.save();
            return res.send({ deleted: true });
        } catch (e) {
            next(e);
        }
    }
}
module.exports = CustomerController;