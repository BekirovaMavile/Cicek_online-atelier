const Router = require("express");
const router = new Router();

const CreateAll = require("../controllers/creators/index");

router.get("/", CreateAll);

module.exports = router;
