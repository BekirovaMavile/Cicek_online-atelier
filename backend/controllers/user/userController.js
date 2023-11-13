const {
  User
} = require("../../models/models");

class UserController {
  async update(req, res) {
    try {
      const userId = req.user.id;
      const userData = req.body;

      const foundUser = await User.findOne({
        where: {
          id: userId
        },
      });

      if (!foundUser) return res.status(404).json({
        "message": "Пользователь не найден"
      });

      for (var param in userData) {
        if (userData[param] == false) { foundUser[param] = "-" }
        else foundUser[param] = userData[param]
      }

      foundUser.save();

      return res.json(foundUser);
    } catch (err) {
      res.status(404).send({
        'message': err
      })
    }
  }

  async getProfile(req, res) {
    try {
      const userId = 1;

      const foundUser = await User.findOne({
        where: {
          id: userId
        },
      });

      if (!foundUser) return res.status(404).json({
        "message": "Пользователь не найден"
      });

      const { password, refreshToken, createdAt, updatedAt, ...userData } = foundUser.dataValues
      return res.json(userData);
    } catch (err) {
      res.status(404).send({
        'message': err
      })
    }
  }

}

module.exports = new UserController();