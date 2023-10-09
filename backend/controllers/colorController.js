const { Color } = require("../models/models");
const { badRequest } = "../error/ApiError";

class colorController {
  async create(req, res, next) {
    try {
      let { name } = req.body;

      const color = await Color.create({
        name,
        icon,
      });

      return res.json(color);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const colors = await Color.findAll();
    return res.json(colors);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const color = await Color.findOne({
      where: {
        id,
      },
    });
    return res.json(params);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const color = await Color.destroy({
      where: {
        id,
      },
    });
    return res.json(color);
  }

  async updateItem(req, res, next) {
    try {
      let { name, icon, id } = req.body;

      const [updated] = await Color.update(
        {
          name,
          icon,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updated === 0) {
        return res.status(404).send({ error: "Color not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new colorController();