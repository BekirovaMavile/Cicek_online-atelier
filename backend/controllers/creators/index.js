const { createProdCat } = require("./creating_product_cats");
const { createColors } = require("./creating_colors");
const { createMaterials } = require("./creating_materials");
const { createPartCat } = require("./creating_part_cats");
const { createParts } = require("./creating_parts");

CreateAll = async () => {
  createProdCat();
  createColors();
  createMaterials();
  createPartCat();
  createParts();
};

module.export = new CreateAll();

