const { ProductCategory } = require("../models/models");
const fileService = require("../service/fileService");
const { badRequest } = require("../error/ApiError");

class productcategoryController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const fileName = fileService.saveFile(req.file.image)

      const productCategory = await ProductCategory.create({
        name,
        icon: fileName,
      });

      return res.json(productCategory);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const productCategorys = await ProductCategory.findAll();
    return res.json(productCategorys);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const productCategory = await ProductCategory.findOne({
      where: {
        id,
      },
    });
    return res.json(productCategory);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const productCategory = await ProductCategory.destroy({
      where: {
        id,
      },
    });
    return res.json(productCategory);
  }

  async updateItem(req, res, next) {
    try {
      let { name, icon, id } = req.body;

      const [updated] = await ProductCategory.update(
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
        return res.status(404).send({ error: "Product category not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new productcategoryController();
