const router = require('express').router();

router.use('/user', require('./users'));

module.exports = router;