const { Part } = require("../models/models");
const { badRequest } = "../error/ApiError";

class partController {
  async create(req, res, next) {
    try {
      let { name, icon, part_category_id } = req.body;

      const part = await Part.create({
        name,
        icon,
        part_category_id,
      });

      return res.json(part);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const parts = await Part.findAll();
    return res.json(parts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const part = await Part.findOne({
      where: {
        id,
      },
    });
    return res.json(part);
  }
  async getByCategory(req, res) {
    const { part_category_id } = req.params;
    const parts = await Part.findAll({
      where: { part_category_id },
    });
    return res.json(parts);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const part = await Part.destroy({
      where: {
        id,
      },
    });
    return res.json(part);
  }

  async updateItem(req, res, next) {
    try {
      let { name, icon, id, part_category_id } = req.body;

      const [updated] = await Part.update(
        {
          name,
          icon,
          part_category_id,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updated === 0) {
        return res.status(404).send({ error: "Part not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new partController();
