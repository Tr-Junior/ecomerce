const router = require('express').Router();

router.use('/user', require('./users-route'));
router.use('/store', require('./store-route'));
router.use('/customer', require('./customer-route'));
router.use('/category', require('./category-route'));
module.exports = router;