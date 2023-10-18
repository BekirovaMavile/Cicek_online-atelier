const Router = require("express");
const router = Router();

import {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
  getByCategory,
} from "../controllers/partcategoryController.js";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:product_categories_id", getByCategory);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

mdule.export = router;