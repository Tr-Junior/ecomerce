const mongoose = require('mongoose');
const category = require('../models/category');

const Category = mongoose.model('Category');

class CategoryController {

    //GET / index

    index(req, res, next) {
        Category.find({ store: req.query.store })
            .select('_id products name code store')
            .then((category) => res.send({ category }))
            .catch(next);
    }

    //GET /disponibility
    indexDisponibility(req, res, next) {
        Category
            .find({ store: req.query.store, disponibility: true })
            .select('_id products name code store')
            .then((category) => res.send({ category }))
            .catch(next);
    }

    // /:id show
    show(req, res, next) {
        Category.findOneAndDelete({ store: req.query.store, _id: req.params.id })
            .select('_id products name code store')
            .populate(['products'])
            .then(category => res.send({ category }))
            .catch(next);
    }

    //POST /store

    store(req, res, next) {
        const { name, code } = req.body;
        const { store } = req.query;

        const category = new Category({ name, code, store, disponibility: true })
        category.save()
            .then(() => res.send({ category }))
            .catch(next);
    }

    //PUT /:id update

    async update(req, res, next) {
        const { name, code, disponibility, products } = req.body;
        try {
            const category = await Category.findById(req.params.id);

            if (name) category.name = name;
            if (disponibility !== undefined) category.disponibility = disponibility;

            if (code) category.code = code;
            if (products) category.products = products;

            await category.save();
            return res.send({ category });

        } catch (e) { next(e); }
    }

    //DELETE /:id remove

    async remove(req, res, next) {
        try {
            const category = await Category.findById(req.params.id);
            await category.remove();
            return res.send({ deletado: true });
        } catch (e) {
            next(e)
        }
    }

    /**
     * PRODUCTS
     **/
}

module.exports = CategoryController;