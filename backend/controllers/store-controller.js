const mongoose = require('mongoose');
const Store = mongoose.model('Store');

class StoreController {
    //GET/
    index(req, res, next) {
        Store.find({}).select('_id name cnpj email phone address')
            .then(store => res.send({ store }))
            .catch(next);
    }

    //SHOW /
    show(req, res, next) {
        Store.findById(req.params.id).select('_id name cnpj email phone address')
            .then(store => res.send({ store }))
            .catch(next);
    }

    //POST/
    store(req, res, next) {
        const { name, cnpj, email, phone, address } = req.body;

        const error = [];
        if (!name) error.push('name');
        if (!cnpj) error.push('cnpj');
        if (!email) error.push('email');
        if (!phone) error.push('phone');
        if (!address) error.push('address');
        if (error.length > 0) return res.status(422).json({ error: 'required', payload: error });

        const store = new Store({ name, cnpj, email, phone, address });
        store.save().then(() => res.send({ store })).catch(next);

    }

    //PUT /
    update(req, res, next) {
        const { name, cnpj, email, phone, address } = req.body;
        Store.findById(req.params.id)
            .then((store) => {
                if (!store) return res.status(422).send({ error: 'Loja não existe.' });

                if (name) store.name = name;
                if (cnpj) store.cnpj = cnpj;
                if (email) store.email = email;
                if (phone) store.phone = phone;
                if (address) store.address = address;

                store.save()
                    .then(() => res.send({ store }))
                    .catch(next);
            })
            .catch(next);
    }

    //DELETE /:id /
    remove(req, res, next) {
        Store.findByIdAndRemove(req.params.id)
            .then((store) => {
                if (!store) {
                    return res.status(401).json({ errors: "Loja não existe" });
                }
                return res.json({ deleted: true });
            })
            .catch(next);
    }
}

module.exports = StoreController;