const {
  User
} = require("../models/models");

class UserController {
  async create(req, res) {
    const {
      email,
      password,
      first_name,
      last_name,
    } = req.body;

    const user = await User.create({
      email,
      password,
      first_name,
      last_name,
    });
    return res.json(user);
  }

}

module.exports = new UserController();