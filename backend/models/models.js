const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING(250),
  },
  phone_number: {
    type: DataTypes.STRING(45),
  },
  address: {
    type: DataTypes.STRING(45),
  },
});

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

// Связующая таблица между таб. Order and Product
const OrderProduct = sequelize.define("ProductOrder", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(45),
  },
});

const Color = sequelize.define("Color", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

const ProductImage = sequelize.define("Product_Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

const ProductSize = sequelize.define("Product_Size", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

const Material = sequelize.define("Material", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

const Part = sequelize.define("Part", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const ProductPart = sequelize.define("Product_Part", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const PartCategory = sequelize.define("Part_Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

const ProductCategory = sequelize.define("Product_Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

// Связь между таблицами User и Order
User.hasMany(Order, { as: "orders", foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

// Связь между таблицами Product и Order (многие ко многим)
OrderProduct.belongsTo(Order);
OrderProduct.belongsTo(Product);

// Связь между таблицами Product и Color
Color.hasMany(Product, { foreignKey: "color_id" });
Product.belongsTo(Color, { foreignKey: "color_id" });

// Связь между таблицами Product и Material
Material.hasMany(Product, { foreignKey: "material_id" });
Product.belongsTo(Material, { foreignKey: "material_id" });

// Связь между таблицами Product и ProductSize
ProductSize.hasMany(Product, {
  foreignKey: "product_size_id",
});
Product.belongsTo(ProductSize, { foreignKey: "product_size_id" });

// Связь между таблицами Product и ProductImage
Product.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

// Связь между таблицами Product и ProductCategory
ProductCategory.hasMany(Product, {
  foreignKey: "product_categories_id",
});
Product.belongsTo(ProductCategory, { foreignKey: "product_categories_id" });

// Связь между таблицами ProductCategory и PartCategory
ProductCategory.hasMany(PartCategory, {
  foreignKey: "product_categories_id",
});
PartCategory.belongsTo(ProductCategory, {
  foreignKey: "product_categories_id",
});

// Связь между таблицами Part и ProductCategory
PartCategory.hasMany(Part, {
  as: "part_categories",
  foreignKey: "part_category_id",
});
Part.belongsTo(PartCategory, { foreignKey: "part_category_id" });

// Связь между таблицами Part и Product (многие ко многим)
ProductPart.belongsTo(Part, { foreignKey: "part_id" });
ProductPart.belongsTo(Product, { foreignKey: "product_id" });

// Связь между таблицами User и Review
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Order,
  Review,
  Color,
  Product,
  ProductImage,
  ProductSize,
  Material,
  Part,
  ProductPart,
  PartCategory,
  ProductCategory,
  OrderProduct,
};
