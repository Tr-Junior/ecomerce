const router = require('express').Router();
const auth = require('../../auth');
const UserController = require('../../../controllers/user-controller');

const userController = new UserController();

router.post('/login', userController.login);
router.post('/register', userController.store);

router.put('/', auth.required, userController.update);

router.delete('/', auth.required, userController.remove);

router.get('/recovery-password', userController.showRecovery);
router.post('/recovery-password', userController.createRecovery);
router.get('/password-recovered', userController.showCompletedRecovery);
router.post('/password-recovered', userController.completeRecovery);

router.get('/', auth.required, userController.index);
router.get('/:id', auth.required, userController.show);
module.exports = router;