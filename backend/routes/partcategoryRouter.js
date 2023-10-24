const Router = require("express");
const router = new Router();

const {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
  getByCategory,
} = require("../controllers/partcategoryController.js");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:product_categories_id", getByCategory);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;