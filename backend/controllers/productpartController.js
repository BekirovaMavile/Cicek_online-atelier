const { ProductPart } = require("../models/models");
const { badRequest } = "../error/ApiError";

class productPartController {
  async create(req, res, next) {
    try {
      let { product_id, part_id } = req.body;

      const productPart = await ProductPart.create({
        part_id,
        product_id,
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

  async getbyProduct(req, res) {
    const { product_id } = req.params;
    const productPart = await ProductPart.findAll({
      where: {
        product_id,
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
      let { id } = req.body;

      const [updated] = await ProductPart.update(
        {
          part_id,
          product_id,
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
