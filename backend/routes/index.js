const Router = require('express')
const router = new Router()
const materialRouter = require("./materialRouter");
const userRouter = require("./userRouter");
const orderRouter = require('./orderRouter')
const reviewRouter = require('./reviewRouter')

router.use("/material", materialRouter);
router.use("/user", userRouter);
router.use("/orders", orderRouter);
router.use("/reviews", reviewRouter);

module.exports = router;
