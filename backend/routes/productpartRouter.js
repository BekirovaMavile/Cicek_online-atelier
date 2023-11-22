const Router = require('express')
const router = new Router()
const {
  create,
  getAll,
  getbyProduct,
  deleteItem,
  updateItem,
} = require('../controllers/productpartController');
const verifyJWT = require('../middleware/verifyJWT.JS');

router.post("/", create);
router.get("/", getAll);
router.get("/:product_id", getbyProduct);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

module.exports = router
