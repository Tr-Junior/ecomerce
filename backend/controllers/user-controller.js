const mongoose = require('mongoose');
const User = mongoose.model('User');
const sendMailRecovery = require('../helpers/email-recovery');
const { estimatedDocumentCount } = require('../models/user');

class UserController {

    //GET

    index(req, rex, next) {
        User.findById(req.payload.id).then(user => {
            if (!user) return res.status(401).json({ errors: 'Usuário não registrado' });
            return res.json({ user: user.sendAuthJSON() });
        })
    }

    //GET /:id

    show(req, res, next) {
        User.findById(req.params.id).populate({ path: 'store' })
            .then(user => {
                if (!user) return res.status(401).json({ errors: 'Usuário não registrado' });
                return res.json({
                    user: {
                        name: user.name,
                        email: user.email,
                        permission: user.permission,
                        store: user.store

                    }
                });
            }).catch(next);
    }

    //POST /register

    store(req, res, next) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(422).json({ errors: 'Preencha todos os campos de cadastro.' })

        const user = new User({ name, email });
        user.setPassword(password);

        user.save()
            .then(() => res.json({ user: user.sendAuthJSON() }))
            .catch(next);
    }

    //PUT /

    update(req, res, next) {
        const { name, email, password } = req.body;
        User.findById(req.payload.id).then((user) => {
            if (!user) return res.status(401).json({ errors: 'Usuário não registrado' });
            if (typeof name !== 'undefined') user.name = name;
            if (typeof email !== 'undefined') user.email = email;
            if (typeof password !== 'undefined') user.password = password;

            return user.save().then(() => {
                return response.json({ user: user.sendAuthJSON() });
            }).catch(next);
        }).catch(next);
    }

    //DELETE /
    remove(req, res, next) {
        User.findById(req.payload.id).then(user => {
            if (!user) return res.status(401).json({ errors: 'Usuário não registrado' });
            return user.remove().then(() => {
                return res.josn({ delete: true });
            }).catch(next);
        }).catch(next);
    }


    //POST /login

    login(req, res, next) {
        const { email, password } = req.body;
        if (!email) return res.status(422).json({ errors: { email: 'Não pode ficar vazio' } });
        if (!password) return res.status(422).json({ errors: { email: 'Não pode ficar vazio' } });
        User.findOne({ email }).then((user) => {
            if (!user) return res.status(401).json({ errors: 'Usuário não registrado' });
            if (!user.validatePassword(password)) return res.status(401).json({ errors: 'Senha invalida' });
            return res.json({ user: user.sendAuthJSON() });
        }).catch(next);
    }

    //RECOVERY PASSWORD
    //GET /recovery-password

    showRecoveryPassword(req, res, next) {
        return res.render('recovery-password', { error: null, success: null });
    }

    //POST /recovery-password

    createRecoveryPassword(req, res, next) {
        const { email } = req.body;
        if (!email) return res.render('recovery-password', { error: 'Preencha com seu email', success: null });

        User.findOne({ email }).then((user) => {
            if (!user) return res.render('recovery-password', { error: 'Não existe usuário com este email', success: null });
            const recoveryDate = user.createTokenRecoveryPassword();
            return user.save().then(() => {
                return res.render('recovery-password', { error: null, success: true });
            }).catch(next);
        }).catch(next);
    }

    //GET /recovered-password

    showCompletedPassword(req, res, next) {
        if (!req.query.token) return res.render('recovered-password', { error: 'Token não identificado', success: null });
        User.findOne({ 'recovery.token': req.query.token }).then(user => {
            if (!user) return res.render('recovered-password', { error: 'Não existe usuário com este token', success: null });
            if (new Date(user.recovery.date) < new Date()) return res.render('recovered-password', { error: 'token expirado. Tente novamente.', success: null });
            return res.render('recovery/store', { error: null, success: null, token: req.query.token });
        }).catch(next);
    }

    //POST /recovered-password
    completeRecoveredPassword(req, res, next) {
        const { token, password } = req.body;
        if (!token || !password) return res.render('recovery/store', { error: 'preencha novamente com sua nova senha', success: null, token: token });
        User.findOne({ 'recovery.token': token }).then(user => {
            if (!user) return res.render('recovery', { error: 'Usuário não identificado', success: null });

            user.finalizeTokenRecoveryPassword();
            user.setPassword(password);
            return user.save().then(() => {
                return res.render('recovery/store', {
                    error: null,
                    success: 'Senha alterada com sucesso. Tente fazer o login novamente.',
                    token: null
                })
            }).catch(next);
        });
    }
}