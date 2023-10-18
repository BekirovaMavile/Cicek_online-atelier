const Router = require("express");
const router = Router();

import {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
} from "../controllers/productsizeController.js";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.export = router;