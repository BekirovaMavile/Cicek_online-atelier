import Router from "express";
const router = new Router();
const materialRouter = require("./materialRouter");
const colorRouter = require("./colorRouter");

router.use("/material", materialRouter);
router.use("/color", colorRouter);

export default router;
