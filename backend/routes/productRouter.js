const Router = require("express");
const router = new Router();

const {
  create,
  getAll,
  getOne,
  getByColor,
  getByMaterial,
  getByCategory,
  getBySize,
  deleteItem,
  updateItem,
  search,
} = require("../controllers/productController.js");

router.post("/", create);
router.get("/", getAll);
// router.get("/:id", getOne);
// router.get("/:color_id", getByColor);
// router.get("/:material_id", getByMaterial);
// router.get("/:product_categories_id", getByCategory);
// router.get("/:product_size_id", getBySize);
router.get("/search", search);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;