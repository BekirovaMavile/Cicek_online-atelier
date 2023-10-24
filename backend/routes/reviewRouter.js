const Router = require('express');
const ReviewController = require('../controllers/reviewController');
const router = new Router();
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", verifyJWT, ReviewController.create);
router.get("/", ReviewController.getAll);
router.get("/user/:id", ReviewController.getByUserId); // Возможно не потребуется
router.get("/review/:id", ReviewController.getById); // Возможно не потребуется
router.put("/", verifyJWT, ReviewController.updateReview);

module.exports = router;