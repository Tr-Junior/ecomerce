const mongoose = require("mongoose");

const User = mongoose.model("User");
const Store = mongoose.model("Store");

module.exports = (req, res, next) => {
    if (!req.payload.id) return res.sendStatus(401);
    const { store } = req.query;
    if (!store) return res.sendStatus(401);
    User.findById(req.payload.id)
        .then((user) => {
            if (!user) return res.sendStatus(401);
            if (!user.store) return res.sendStatus(401);
            if (!user.permission.includes("admin")) return res.sendStatus(401);
            if (user.store !== store) return res.sendStatus(401);
            next();
        })
        .catch(next);
};
