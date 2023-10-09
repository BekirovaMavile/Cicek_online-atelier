import Router from "express";
const router = new Router();
const materialRouter = require("./materialRouter");
const colorRouter = require("./colorRouter");
const ptoductsizeRouter = require("./producrsizeRouter");

router.use("/material", materialRouter);
router.use("/color", colorRouter);
router.use("/productsize", ptoductsizeRouter);

export default router;
