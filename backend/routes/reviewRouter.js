const Router = require('express');
const ReviewController = require('../controllers/reviewController');
const router = new Router()
const verifyJWT = require("../middleware/verifyJWT")

router.post("/", ReviewController.create);
router.get("/", ReviewController.getAll);
router.get("/user/:id", ReviewController.getByUserId)
router.get("/review/:id", ReviewController.getById)
router.put("/", ReviewController.updateReview)

module.exports = router