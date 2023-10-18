const Router = require("express");
const router = new Router();

import {
  create,
  getAll,
  getOne,
  getByColor,
  getByMaterial,
  getByCategory,
  getBySize,
  deleteItem,
  updateItem,
} from "../controllers/productController.js";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:color_id", getByColor);
router.get("/:material_id", getByMaterial);
router.get("/:product_categories_id", getByCategory);
router.get("/:product_size_id", getBySize);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.export = router;