const { ProductSize } = require("../models/models");
const { badRequest } = require("../error/ApiError");

class product_size_Controller {
  async create(req, res, next) {
    try {
      let { name } = req.body;

      const product_size = await ProductSize.create({
        name,
      });

      return res.json(product_size);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const product_sizes = await ProductSize.findAll();
    return res.json(product_sizes);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product_size = await ProductSize.findOne({
      where: {
        id,
      },
    });
    return res.json(product_size);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const product_size = await ProductSize.destroy({
      where: {
        id,
      },
    });
    return res.json(product_size);
  }

  async updateItem(req, res, next) {
    try {
      let { name,  id } = req.body;

      const [updated] = await ProductSize.update(
        {
          name,

        },
        {
          where: {
            id,
          },
        }
      );

      if (updated === 0) {
        return res.status(404).send({ error: "Product size not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new product_size_Controller();
