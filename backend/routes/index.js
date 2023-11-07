const Router = require('express')
const router = new Router()
const materialRouter = require("./materialRouter");
const userRouter = require("./userRouter");
const orderRouter = require('./orderRouter')
const reviewRouter = require('./reviewRouter')
const colorRouter = require("./colorRouter");
const ptoductsizeRouter = require("./producrsizeRouter");
const partRouter = require("./partRouter");
const partcategoryRouter = require("./partcategoryRouter");
const productcategoryRouter = require("./productcategoryRouter");
const productRouter = require("./productRouter");
const productpartRouter = require("./productpartRouter");
const creatorRouter = require("./creatorRouter");


router.use("/user", userRouter);
router.use("/orders", orderRouter);
router.use("/reviews", reviewRouter);
router.use("/material", materialRouter);
router.use("/color", colorRouter);
router.use("/productsize", ptoductsizeRouter);
router.use("/part", partRouter);
router.use("/product", productRouter);
router.use("/partcategory", partcategoryRouter);
router.use("/productcategory", productcategoryRouter);
router.use("/productpart", productpartRouter);
router.use("/creator", creatorRouter);

module.exports = router;
