import { Router } from "express";
const router = Router();

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
} from "controllers/productController.js";
// import checkRole from "../middleware/checkRoleMiddleware";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:color_id", getByColor);
router.get("/:material_id", getByMaterial);
router.get("/:product_categories_id", getByCategory);
router.get("/:product_size_id", getBySize);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

export default router;
// , checkRole("ADMIN")
