const { Review } = require("../models/models");

class ReviewController {
    async create(req, res) {
        const user_id = req.user.id
        const {rating, comment} = req.body;
        try {
            const review = await Review.create({user_id, rating, comment});
            res.json(review)
        } catch (err) {
            res.status(404).send({ 'message': err })
        }

    }
    async getAll(req, res) {
        try {
            const reviews = await Review.findAll();
            res.json(reviews)
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }

    async getByUserId(req, res) {
        try {
            const { id } = req.params;
            const reviewsUser = await Review.findAll({
                where: {
                    user_id: Number(id)
                },
            });
            return res.json(reviewsUser);
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const foundReview = await Review.findOne({
                where: {
                    id: Number(id)
                },
            });
            return res.json(foundReview);
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }

    async updateReview(req, res) {
        try {
            const userId = req.user.id;

            const { newRaiting, newComment, id } = req.body;
            const foundReview = await Review.findOne({
                where: {
                    id: Number(id)
                },
            });

            if (!(foundReview.user_id === userId)) return res.status(404).json({"message": "Нет прав доступа"});
            
            foundReview.status = newRaiting;
            foundReview.comment = newComment;
            foundReview.save();

            return res.json(foundReview);
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }
}

module.exports = new ReviewController()