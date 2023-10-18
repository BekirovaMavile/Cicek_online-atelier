const Router = require('express');
const OrderController = require('../controllers/orderController');
const router = new Router()
const verifyJWT = require("../middleware/verifyJWT")

router.post("/", verifyJWT, OrderController.create);
router.get("/", OrderController.getAll);
router.get("/user/:id", OrderController.getByUserId)
router.get("/order/:id", OrderController.getById)
router.put("/status", OrderController.updateStatus) // Позже стоит добавить проверку на роль, так как только админ или ателье может устанавливать статус заказа

module.exports = router