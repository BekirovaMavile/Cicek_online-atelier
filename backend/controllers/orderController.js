const { Order } = require("../models/models");

class OrderController {
    async create(req, res) {
        const user_id = req.user.id;
        const status = 'В обработке';

        console.log({user_id, "status": status});
        try {
            const order = await Order.create({user_id, "status": status});
            res.json(order)
            // res.json({ 'message': "ok" })
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
            const id = req.user.id;
            
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
            const orderId  = req.params;
            const userId = req.user.id;
            console.log(orderId.id);
            const foundOrder = await Order.findOne({
                where: {
                    id: Number(orderId.id)
                },
            });

            if (foundOrder.user_id === userId) return res.json(foundOrder);
            else return res.status(404).json({"message": "Нет прав доступа"})
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