import Router from "express";
const router = new Router();
const materialRouter = require("./materialRouter");

router.use("/material", materialRouter);

export default router;
