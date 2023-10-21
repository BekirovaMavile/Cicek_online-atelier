const {
  User
} = require("../../models/models");

class UserController {
  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

}

module.exports = new UserController();