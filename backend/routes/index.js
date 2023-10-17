import Router from "express";
const router = new Router();
const materialRouter = require("./materialRouter");
const colorRouter = require("./colorRouter");
const ptoductsizeRouter = require("./producrsizeRouter");
const partRouter = require("./partRouter");
const partcategoryRouter = require("./partcategoryRouter");
const productcategoryRouter = require("./productcategoryRouter");
const productRouter = require("./productRouter");

router.use("/material", materialRouter);
router.use("/color", colorRouter);
router.use("/productsize", ptoductsizeRouter);
router.use("/part", partRouter);
router.use("/product", productRouter);
router.use("/partcategory", partcategoryRouter);
router.use("/productcategory", productcategoryRouter);

export default router;
