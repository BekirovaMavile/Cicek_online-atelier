const {
    User
} = require("../models/models");
const bcrypt = require('bcrypt')

class RegisterController {
    async create(req, res) {
        const {
            email,
            password,
            first_name,
            last_name,
        } = req.body;

        // Проверка на пустые поля
        if (!email || !password || !first_name || !last_name) return res.status(400).json({
            'message': "Fields are empty."
        })

        // Проверка на повторение по email
        const duplicate = await User.findOne({
            where: {
                email: email,
            }
        })
        if (duplicate) return res.sendStatus(409); // Conflict

        // Шифрование пароля
        const hashedPwd = await bcrypt.hash(password, 10)
        // Если все прошло успешно то создание и запись в БД
        try {
            const user = await User.create({
                email,
                password: hashedPwd,
                first_name,
                last_name,
            });
            res.status(201).json({
                'success': `New user ${email} created!`
            })
            console.log(user.dataValues);
        } catch (error) {``
            res.status(500).json({
                'message': error.message
            })
        }

    }

}

module.exports = new RegisterController();