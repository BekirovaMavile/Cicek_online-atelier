const { ProductCategory } = require("../../models/models");

class ProdCatCreator {
  constructor() {
    this.prodcats = [
      { name: "Футболка", image: "./image/material_cicek/футболка.jpeg" },
      { name: "Платье", image: "./image/material_cicek/платье.jpeg" },
      { name: "Брюки", image: "./image/material_cicek/брюки.jpeg" },
      { name: "Худи", image: "./image/material_cicek/худи.jpeg" },
    ];
  }
  async createProdCat() {
    for (const elem of this.prodcats) {
      await ProductCategory.create({
        name: elem.name,
        icon: elem.image,
      });
    }
  }
}

module.export = new ProdCatCreator();
