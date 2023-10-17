const { PartCategory } = require("../models/models");
const { badRequest } = "../error/ApiError";

class partcategoryController {
  async create(req, res, next) {
    try {
      let { name, icon } = req.body;

      const partCategory = await PartCategory.create({
        name,
        icon,
      });

      return res.json(partCategory);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const partCategorys = await PartCategory.findAll();
    return res.json(partCategorys);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const partCategory = await PartCategory.findOne({
      where: {
        id,
      },
    });
    return res.json(params);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const partCategory = await PartCategory.destroy({
      where: {
        id,
      },
    });
    return res.json(partCategory);
  }

  async updateItem(req, res, next) {
    try {
      let { name, icon, id } = req.body;

      const [updated] = await PartCategory.update(
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
        return res.status(404).send({ error: "Part category not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new partcategoryController();