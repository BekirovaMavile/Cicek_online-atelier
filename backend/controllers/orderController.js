const { Order } = require("../models/models");

class OrderController {
    async create(req, res) {
        const {user_id, status} = req.body;
        try {
            const order = await Order.create({user_id, status});
            res.json(order)
        } catch (err) {
            res.status(404).send({ 'message': err })
        }

    }
    async getAll(req, res) {
        try {
            const orders = await Order.findAll();
            res.json(orders)
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }

    async getByUserId(req, res) {
        try {
            const { id } = req.params;
            const ordersUser = await Order.findAll({
                where: {
                    user_id: Number(id)
                },
            });
            return res.json(ordersUser);
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const foundOrder = await Order.findOne({
                where: {
                    id: Number(id)
                },
            });
            return res.json(foundOrder);
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }

    async updateStatus(req, res) {
        try {
            const { newStatus, id } = req.body;
            const foundOrder = await Order.findOne({
                where: {
                    id: Number(id)
                },
            });

            foundOrder.status = newStatus;
            foundOrder.save();

            return res.json(foundOrder);
        } catch (err) {
            res.status(404).send({ 'message': err })
        }
    }
}

module.exports = new OrderController()