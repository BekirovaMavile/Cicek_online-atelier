const Router = require('express')
const router = new Router()
const materialRouter = require("./materialRouter");
const userRouter = require("./userRouter");
const orderRouter = require('./orderRouter')
router.use("/material", materialRouter);
router.use("/user", userRouter);
router.use("/order", orderRouter);

module.exports = router;
