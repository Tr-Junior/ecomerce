const router = require('express').Router();

const auth = require('../../auth');

const { StoreValidator } = require('../../../controllers/validator/store-validator');
const { UserValidation } = require('../../../controllers/validator/user-Validator');

const { validate } = require('express-validation');


const customerController = new customerController();

//ADMIN
router.get('/', auth.required, StoreValidator.admin, customerController.index);
router.get('/search/:search/orders', auth.required, StoreValidator.admin, customerController.searchOrders);
router.get('/search/:search', auth.required, StoreValidator.admin, customerController.search);

router.get('/admin/:id', auth.required, StoreValidator.admin, customerController.showAdmin);
router.get('/admin/:id/:orders', auth.required, StoreValidator.admin, customerController.showOrdersCustomers);

router.put("/admin/id:", auth.required, StoreValidator.admin, customerController.updateAdmin);

//CUSTOMER
router.get("/:id", auth.required, customerController.show);

router.post("/", customerController.store);
router.put("/:id", auth.required, customerController.update);
router.delete("/:id", auth.required, customerController.remove);

module.exports = router;