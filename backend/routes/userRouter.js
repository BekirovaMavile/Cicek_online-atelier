const Router = require('express')
const router = new Router()
const RegisterController = require('../controllers/user/registerController')
const AuthController = require('../controllers/user/authController')
const RefreshTokenController = require('../controllers/user/refreshTokenController')
const LogoutController = require('../controllers/user/logoutController')

router.post("/registration", RegisterController.create);
router.post("/auth", AuthController.handleLogin);
router.get("/refresh", RefreshTokenController.handleRefreshToken);
router.get("/logout", LogoutController.handleLogout);

module.exports = router