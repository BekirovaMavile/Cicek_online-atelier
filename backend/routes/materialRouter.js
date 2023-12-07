const Router = require('express')
const router = new Router()
const {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
} = require('../controllers/materialController');
const verifyJWT = require('../middleware/verifyJWT');

router.post("/", verifyJWT, create);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router
