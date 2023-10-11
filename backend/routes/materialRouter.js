const Router = require('express')
const router = new Router()
const materialController = require('../controllers/materialController')
// import checkRole from "../middleware/checkRoleMiddleware";

router.post("/", materialController.create);
router.get("/", materialController.getAll);
router.get("/:id", materialController.getOne);
router.delete("/:id", materialController.deleteItem);
router.put("/:id", materialController.updateItem);
// ошибка может быть в том что id в параметрах, а не в теле запрса

module.exports = router