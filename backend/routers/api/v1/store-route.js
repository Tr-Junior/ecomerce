const router = require('express').Router();
const storeValidator = require('../../../controllers/validator/store-validator')
const auth = require('../../auth');
const StoreController = require('../../../controllers/store-controller');

const storeController = new StoreController();

router.get('/', storeController.index);
router.get('/:id', storeController.show);

router.post('/', auth.required, storeController.store);
router.put('/:id', auth.required, storeValidator, storeController.update);
router.delete('/:id', auth.required, storeValidator, storeController.remove);



module.exports = router;