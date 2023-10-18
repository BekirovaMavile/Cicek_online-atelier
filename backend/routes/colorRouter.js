const Router = require("express");
const router = new Router();

const {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
} = require("../controllers/colorController");
// import checkRole from "../middleware/checkRoleMiddleware";

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);
// ошибка может быть в том что id в параметрах, а не в теле запрса

module.export = router;
// , checkRole("ADMIN")
