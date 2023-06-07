const router = require('express').router();

router.use('/user', require('./users-route'));

module.exports = router;