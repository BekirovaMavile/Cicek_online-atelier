const {
    User
} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

class AuthController {
    async handleLogin(req, res) {
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
        // Поиск пользователя с таким email
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (!foundUser) return res.sendStatus(401); // Not found or Unauthorized

        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {
            // Создание JWT
            const accessToken = jwt.sign({
                email: foundUser.email
            },
                process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s'
            }
            );
            const refreshToken = jwt.sign({
                email: foundUser.email
            },
                process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            }
            );

            foundUser.refreshToken = refreshToken;
            foundUser.save();

            console.log(foundUser.dataValues);
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    }
}

module.exports = new AuthController();