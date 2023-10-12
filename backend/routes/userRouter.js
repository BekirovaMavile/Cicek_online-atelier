const Router = require('express')
const router = new Router()
const RegisterController = require('../controllers/registerController')
const AuthController = require('../controllers/authController')

router.post("/registration", RegisterController.create);
router.post("/auth", AuthController.handleLogin);

module.exports = router