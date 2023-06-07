const router = require('express').Router();
const auth = require('../../auth');
const userController = require('../../controllers/user-controller');

const userController = new UserController();

router.get('/', auth.required, userController.index);
router.get('/:id', auth.required, userController.show);

router.post('/login', auth.required, userController.login);
router.post('/register', auth.required, userController.store);

router.put('/', auth.required, userController.update);

router.delete('/', auth.required, userController.remove);

router.get('/recovery-password', auth.required, userController.showRecoveryPassword);
router.post('/recovery-password', auth.required, userController.createRecoveryPassword);
router.get('/recovered-password', auth.required, userController.showCompletedRecoveredPassword);
router.post('/recovered-password', auth.required, userController.create.completeRecoveredPassword);

module.exports = router;