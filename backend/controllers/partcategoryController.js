const { PartCategory, PartProductCategory } = require("../models/models");
const { badRequest } = "../error/ApiError";

class partcategoryController {
  async create(req, res, next) {
    try {
      let { name, icon, product_categories_id } = req.body;

      const partCategory = await PartCategory.create({
        name,
        icon,
        product_categories_id,
      });

      return res.json(partCategory);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const id = req.query.productCategoryId;
    const partCategories = await PartCategory.findAll({
        where: { product_categories_id: id},
        attributes: ['name', 'icon', 'id', 'product_categories_id']
    });
    return res.json(partCategories);
}



  async getOne(req, res) {
    const { id } = req.params;
    const partCategory = await PartCategory.findOne({
      where: {
        id,
      },
    });
    return res.json(partCategory);
  }

  async getByCategory(req, res) {
    const { product_categories_id } = req.params;
    const partCategorys = await PartCategory.findAll({
      where: {
        product_categories_id,
      },
    });
    return res.json(partCategorys);
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