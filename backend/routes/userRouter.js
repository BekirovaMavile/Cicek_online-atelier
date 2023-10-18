const Router = require('express')
const router = new Router()
const RegisterController = require('../controllers/registerController')
const AuthController = require('../controllers/authController')
const RefreshTokenController = require('../controllers/refreshTokenController')
const LogoutController = require('../controllers/logoutController')

router.post("/registration", RegisterController.create);
router.post("/auth", AuthController.handleLogin);
router.get("/refresh", RefreshTokenController.handleRefreshToken);
router.get("/logout", LogoutController.handleLogout);

module.exports = router