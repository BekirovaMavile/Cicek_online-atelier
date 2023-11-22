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
          // console.log(part_id);
          // console.log(product.id);
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

  async search(req, res) {
    const { valueToSearch } = req.query; // Параметр запроса, который определяет, что искать
    let whereCondition = {};

    if (valueToSearch) {
      switch (valueToSearch) {
        case "id":
          whereCondition.id = req.body.id;
          break;
        case "color_id":
          whereCondition.color_id = req.body.color_id;
          break;
        case "material_id":
          whereCondition.material_id = req.body.material_id;
          break;
        case "product_categories_id":
          whereCondition.product_categories_id = req.body.product_categories_id;
          break;
        case "product_size_id":
          whereCondition.product_size_id = req.body.product_size_id;
          break;
        default:
          return res.status(400).json({ error: "Invalid search parameter" });
      }
    } else {
      return res.status(400).json({ error: "Search parameter is required" });
    }

    const products = await Product.findAll({
      where: whereCondition,
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
