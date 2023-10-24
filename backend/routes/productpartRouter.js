const Router = require('express')
const router = new Router()
const {
  create,
  getAll,
  getOne,
  deleteItem,
  updateItem,
} = require('../controllers/productpartController');
const verifyJWT = require('../middleware/verifyJWT.JS');

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router