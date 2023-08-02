const router = require('express').Router();

const CategoryController = require('../../../controllers/category-controller.js');

const auth = require("../../auth.js");
const { validate } = require('express-validation');
const { StoreValidator } = require('../../../controllers/validator/store-validator.js');
const { CategoryValidator } = require('../../../controllers/validator/category-validator.js');

const categoryController = new CategoryController();

router.get('/', validate(CategoryValidator.index), categoryController.index);
router.get('/disponibility', validate(CategoryValidator.indexDisponibility), categoryController.indexDisponibility);
router.get('/:id', validate(CategoryValidator.show), categoryController.show);

router.post('/', auth.required, StoreValidator.admin, validate(CategoryValidator.store), categoryController.store);
router.put('/:id', auth.required, StoreValidator.admin, validate(CategoryValidator.update), categoryController.update);
router.delete('/:id', auth.required, StoreValidator.admin, validate(CategoryValidator.remove), categoryController.remove);

//ROUTES PRODUCT

module.exports = router;
