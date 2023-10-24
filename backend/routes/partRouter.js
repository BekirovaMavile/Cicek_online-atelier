const Router = require("express");
const router = new Router();

const {
  create,
  getAll,
  getOne,
  getByCategory,
  deleteItem,
  updateItem,
} = require("../controllers/partController.js");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.get("/:part_category_id", getByCategory);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router;
