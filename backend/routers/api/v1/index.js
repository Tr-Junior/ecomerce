const router = require('express').Router();

router.use('/user', require('./users-route'));
router.use('/store', require('./store-route'));

module.exports = router;