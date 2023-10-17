import { Router } from "express";
const router = Router();

import { create, getAll, getOne, deleteItem, updateItem } from "controllers/partController.js"
// import checkRole from "../middleware/checkRoleMiddleware";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:part_category_id", getByCategory);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

export default router;
// , checkRole("ADMIN")