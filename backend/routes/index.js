import Router from "express";
const router = new Router();
const materialRouter = require("./materialRouter");
const colorRouter = require("./colorRouter");
const ptoductsizeRouter = require("./producrsizeRouter");
const partRouter = require("./partRouter");

router.use("/material", materialRouter);
router.use("/color", colorRouter);
router.use("/productsize", ptoductsizeRouter);
router.use("/part", partRouter);

export default router;
