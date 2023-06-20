const router = require('express').Router();

const auth = require('../../auth');
const StoreController = require('../../../controllers/store-controller');

const { validate } = require('express-validation');
const { StoreValidator } = require('../../../controllers/validator/store-validator');

const storeController = new StoreController();

router.get('/', storeController.index);
router.get('/:id', validate(StoreValidator.show), storeController.show);

router.post('/', auth.required, storeController.store);
router.put('/', auth.required, StoreValidator.admin, validate(StoreValidator.update), storeController.update);
router.delete('/', auth.required, StoreValidator.admin, storeController.remove);



module.exports = router;