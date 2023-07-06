const router = require('express').Router();

const auth = require('../../auth');

const CustomerController = require("../../../controllers/customer-controller");

const { StoreValidator } = require('../../../controllers/validator/store-validator');
const { CustomerValidator } = require('../../../controllers/validator/customer-validator');

const { validate } = require('express-validation');

const customerController = new CustomerController();

//ADMIN
router.get('/', auth.required, StoreValidator.admin, validate(CustomerValidator.index), customerController.index);
// router.get('/search/:search/orders', auth.required, StoreValidator.admin, customerController.searchOrders);
router.get('/search/:search', auth.required, validate(CustomerValidator.search), StoreValidator.admin, customerController.search);

router.get('/admin/:id', auth.required, StoreValidator.admin, validate(CustomerValidator.showAdmin), customerController.showAdmin);
// router.get('/admin/:id/:orders', auth.required, StoreValidator.admin, customerController.showOrdersCustomers);

router.put('/admin/:id', auth.required, StoreValidator.admin, validate(CustomerValidator.updateAdmin), customerController.updateAdmin);

//CUSTOMER
router.get("/:id", auth.required, validate(CustomerValidator.show), customerController.show);

router.post("/", validate(CustomerValidator.store), customerController.store);
router.put("/:id", auth.required, validate(CustomerValidator.update), customerController.update);
router.delete("/:id", auth.required, customerController.remove);

module.exports = router;