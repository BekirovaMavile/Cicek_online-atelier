const { Product, ProductPart } = require("../models/models");
const { badRequest } = require("../error/ApiError");

class productController {
  async create(req, res, next) {
      let {
        price,
        description,
        color_id,
        material_id,
        product_size_id,
        product_categories_id,
        part_ids,
      } = req.body;

      const product = await Product.create({
        price: Number(price),
        description,
        color_id: Number(color_id),
        material_id: Number(material_id),
        product_size_id: Number(product_size_id),
        product_categories_id: Number(product_categories_id),
      });

      // Создаем записи в таблице ProductPart для каждого part_id
      if (Array.isArray(part_ids)) {
        await Promise.all(
          part_ids.map(async (part_id) => {
            await ProductPart.create({
              product_id: product.id,
              part_id: part_id, 
            });
          })
        );
        return res.json(product);
      }

  }

  async getAll(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    return res.json(product);
  }

  async getByColor(req, res) {
    const { color_id } = req.params;
    const products = await Product.findAll({
      where: {
        color_id,
      },
    });
    return res.json(products);
  }

  async getByMaterial(req, res) {
    const { material_id } = req.params;
    const products = await Product.findAll({
      where: {
        material_id,
      },
    });
    return res.json(products);
  }

  async getByCategory(req, res) {
    const { product_categories_id } = req.params;
    const products = await Product.findAll({
      where: {
        product_categories_id,
      },
    });
    return res.json(products);
  }

  async getBySize(req, res) {
    const { product_size_id } = req.params;
    const products = await Product.findAll({
      where: {
        product_size_id,
      },
    });
    return res.json(products);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const product = await Product.destroy({
      where: {
        id,
      },
    });
    return res.json(product);
  }

  async updateItem(req, res, next) {
    try {
      let {
        price,
        description,
        color_id,
        material_id,
        product_size_id,
        product_categories_id,
        id,
      } = req.body;

      const [updated] = await Product.update(
        {
          price,
          description,
          color_id,
          material_id,
          product_size_id,
          product_categories_id,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updated === 0) {
        return res.status(404).send({ error: "Product not found" });
      }

      return res.json(updated);
    } catch (e) {
      next(badRequest(e.message));
    }
  }
}

module.exports = new productController();
