const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
    if (!req.headers.authorization) return null;
    const token = req.headers.authorization.split(' ');
    if (token[0] != 'Ecommerce') return null;
    return token[1];
}

const auth = {
    required: (req, res, next) => {
        const token = getTokenFromHeader(req);
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido', status: 401 });
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido', status: 401 });
            }

            req.payload = decoded;
            next();
        });
    },
    optional: (req, res, next) => {
        const token = getTokenFromHeader(req);

        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (!err) {
                    req.payload = decoded;
                }
                next();
            });
        } else {
            next();
        }
    }
};

module.exports = auth;
