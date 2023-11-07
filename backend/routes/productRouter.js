const Router = require("express");
const router = new Router();

const {
  create,
  getAll,
  deleteItem,
  updateItem,
  search,
} = require("../controllers/productController.js");

router.post("/", create);
router.get("/", getAll);
router.get("/search", search);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;