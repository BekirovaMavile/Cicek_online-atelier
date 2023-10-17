import { Router } from "express";
const router = Router();

import {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
} from "controllers/productsizeController.js";
// import checkRole from "../middleware/checkRoleMiddleware";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);
// ошибка может быть в том что id в параметрах, а не в теле запрса

export default router;
// , checkRole("ADMIN")
