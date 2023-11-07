const Router = require("express");
const router = new Router();

const {
  create,
  getAll,
  getOne,
  getByCategory,
  deleteItem,
  updateItem,
  getByProduct,
} = require("../controllers/partController.js");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/cat/:part_category_id", getByCategory);
router.get("/prod/:product_id", getByProduct);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;
