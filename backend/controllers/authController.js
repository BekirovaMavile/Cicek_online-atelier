const {
    User
} = require("../models/models");
const bcrypt = require("bcrypt");

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

        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })

        if(!foundUser) return res.sendStatus(401); // Not found or Unauthorized
        
        // Проверка пароля
        const match = await bcrypt.compare(password, foundUser.password)
        if (match) {
            res.json({"message": `User ${email} is logged in!`})
        } else {
            res.sendStatus(401);
        }
    }
}

module.exports = new AuthController();