const Router = require('express')
const router = new Router();
const materialRouter = require("./materialRouter");

router.use("/material", materialRouter);

module.exports = router;
