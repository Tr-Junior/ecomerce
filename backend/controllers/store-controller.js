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

        const store = new Store({ name, cnpj, email, phone, address });
        store.save().then(() => res.send({ store })).catch(next);

    }

    //PUT /
    update(req, res, next) {
        const { name, cnpj, email, phone, address } = req.body;
        const storeId = req.query.store; // Obtém o ID da loja do parâmetro de consulta

        Store.findById(storeId)
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
        Store.findByIdAndRemove(req.query.store)
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