const { ProductPart } = require("../models/models");
const { badRequest } = require("../error/ApiError");
const fileService = require("../service/fileService")

class productPartController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const fileName = fileService.saveFile(req.files.image)

      const productPart = await ProductPart.create({
        name,
        icon: fileName,
      });

      return res.json(productPart);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const productParts = await ProductPart.findAll();
    return res.json(productParts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const productPart = await ProductPart.findOne({
      where: {
        id,
      },
    });
    return res.json(productPart);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const productPart = await ProductPart.destroy({
      where: {
        id,
      },
    });
    return res.json(productPart);
  }

  async updateItem(req, res, next) {
    try {
      let { name, icon, id } = req.body;

      const [updated] = await ProductPart.update(
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
        return res.status(404).send({ error: "ProductPart not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new productPartController();
