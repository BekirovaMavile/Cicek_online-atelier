import { Router } from "express";
const router = Router();

import {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
  getByCategory,
} from "controllers/partcategoryController.js";
// import checkRole from "../middleware/checkRoleMiddleware";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:product_categories_id", getByCategory);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);
// ошибка может быть в том что id в параметрах, а не в теле запрса

export default router;
// , checkRole("ADMIN")
