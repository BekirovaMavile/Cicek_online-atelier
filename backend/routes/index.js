const Router = require('express')
const router = new Router()
const materialRouter = require("./materialRouter");
const userRouter = require("./userRouter");

router.use("/material", materialRouter);
router.use("/user", userRouter);

module.exports = router;
