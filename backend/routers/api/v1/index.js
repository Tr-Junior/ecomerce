const router = require('express').Router();

router.use('/user', require('./users-route'));
router.use('/store', require('./store-route'));
router.use('/customer', require('./customer-route'));

module.exports = router;