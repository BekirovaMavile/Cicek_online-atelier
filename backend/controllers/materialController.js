const { Material } = require("../models/models");
const { badRequest } = "../error/ApiError";

class materialController {
  async create(req, res, next) {
    try {
      let { name, icon } = req.body;

      const material = await Material.create({
        name,
        icon,
      });

      return res.json(material);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const materials = await Material.findAll();
    return res.json(materials);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const material = await Material.findOne({
      where: {
        id,
      },
    });
    return res.json(material);
  }

  async deleteItem(req, res) {
    const { id } = req.body;
    const material = await Material.destroy({
      where: {
        id,
      },
    });
    return res.json(material);
  }

  async updateItem(req, res, next) {
    try {
      let { name, icon, id } = req.body;

      const [updated] = await Material.update(
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
        return res.status(404).send({ error: "Material not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new materialController();