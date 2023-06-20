const router = require('express').Router();
const auth = require('../../auth');
const UserController = require('../../../controllers/user-controller');

const { validate } = require('express-validation');
const { UserValidation } = require('../../../controllers/validator/user-Validator');

const userController = new UserController();

router.post('/login', validate(UserValidation.login), userController.login);
router.post('/register', validate(UserValidation.store), userController.store);

router.put('/', auth.required, validate(UserValidation.update), userController.update);

router.delete('/', auth.required, userController.remove);

router.get('/recovery-password', userController.showRecovery);
router.post('/recovery-password', userController.createRecovery);
router.get('/password-recovered', userController.showCompletedRecovery);
router.post('/password-recovered', userController.completeRecovery);

router.get('/', auth.required, userController.index);
router.get('/:id', auth.required, validate(UserValidation.show), userController.show);
module.exports = router;