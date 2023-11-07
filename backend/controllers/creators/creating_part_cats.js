const { PartCategory } = require("../../models/models");

class PartCatCreator {
  constructor() {
    this.partcats = [
      {
        name: "Крой",
        image: "./image/material_cicek/крой_худи.jpeg",
        product: "4",
      },
      {
        name: "Карман",
        image: "./image/material_cicek/карман_худи.jpeg",
        product: "4",
      },
      {
        name: "Капюшон",
        image: "./image/material_cicek/капюшон.jpeg",
        product: "4",
      },
      {
        name: "Крой",
        image: "./image/material_cicek/крой_футболка.jpeg",
        product: "1",
      },
      {
        name: "Крой",
        image: "./image/material_cicek/крой_платье.jpeg",
        product: "2",
      },
      {
        name: "Рукав",
        image: "./image/material_cicek/рукав_платье.jpeg",
        product: "2",
      },
      {
        name: "Подол",
        image: "./image/material_cicek/подол_платье.jpeg",
        product: "2",
      },
      {
        name: "Крой",
        image: "./image/material_cicek/крой_брюки.jpeg",
        product: "3",
      },
      {
        name: "Талия",
        image: "./image/material_cicek/талия_брюки.jpeg",
        product: "3",
      },
      {
        name: "Конец",
        image: "./image/material_cicek/конец.jpeg",
        product: "3",
      },
      {
        name: "Прямой конец (Straight Hem)",
        cat: "10",
        image: "./images/hem_styles/straight_hem_pants.jpeg",
      },
      {
        name: "Завышенный (растянутый) конец (Cropped Hem)",
        cat: "10",
        image: "./images/hem_styles/cropped_hem_pants.jpeg",
      },
      {
        name: "Расклешенный конец (Flared Hem)",
        cat: "10",
        image: "./images/hem_styles/flared_hem_pants.jpeg",
      },
    ];
  }
  async createPartCat() {
    for (const elem of this.partcats) {
      await PartCategory.create({
        name: elem.name,
        icon: elem.image,
        product_categories_id: elem.product,
      });
    }
  }
}

module.export = new PartCatCreator();
