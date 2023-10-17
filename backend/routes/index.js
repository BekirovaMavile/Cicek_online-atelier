import Router from "express";
const router = new Router();
const materialRouter = require("./materialRouter");
const colorRouter = require("./colorRouter");
const ptoductsizeRouter = require("./producrsizeRouter");
const partRouter = require("./partRouter");
const partcategoryRouter = require("./partcategoryRouter");

router.use("/material", materialRouter);
router.use("/color", colorRouter);
router.use("/productsize", ptoductsizeRouter);
router.use("/part", partRouter);
router.use("/partcategory", partcategoryRouter);

export default router;
