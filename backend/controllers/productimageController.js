import { ProductImage } from "../models/models";
const { badRequest } = "../error/ApiError";

class product_image_Controller {
  async create(req, res, next) {
    try {
      let { path, product_id } = req.body;

      const product_image = await ProductImage.create({
        path,
        product_id,
      });

      return res.json(product_image);
    } catch (e) {
      next(badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const product_images = await ProductImage.findAll();
    return res.json(product_images);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product_image = await ProductImage.findOne({
      where: {
        id,
      },
    });
    return res.json(product_image);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const product_image = await ProductImage.destroy({
      where: {
        id,
      },
    });
    return res.json(product_image);
  }

  async updateItem(req, res, next) {
    try {
      let { path, product_id, id } = req.body;

      const [updated] = await ProductImage.update(
        {
          path,
          product_id,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updated === 0) {
        return res.status(404).send({ error: "Product image not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

export default new product_image_Controller();