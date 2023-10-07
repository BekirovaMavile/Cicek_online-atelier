const sequelize = require('../db')

const {
    DataTypes
} = require('sequelize')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(45),
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
  phone_number: {
    type: DataTypes.STRING(45),
  },
  address: {
    type: DataTypes.STRING(45),
  },
});

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

// Связующая таблица между таб. Order and Product
const OrderProduct = sequelize.define('ProductOrder', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(45),
  },
});

const Color = sequelize.define('Color', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

const ProductImage = sequelize.define('Product_Image', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

const ProductSize = sequelize.define('Product_Size', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  hip_girth: {
    type: DataTypes.STRING(45),
  },
  chest_girth: {
    type: DataTypes.STRING(45),
  },
});

const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

const Part = sequelize.define('Part', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

const PartCategory = sequelize.define('Part_Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(200),
  },
});

// Связующая таблица между таб. PartCategory and ProductCategory
const PartProductCategory = sequelize.define('PartProductCategory', {})

const ProductCategory = sequelize.define('Product_Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

// Связь между таблицами User и Order
User.hasMany(Order, { as: 'orders', foreignKey: 'user_id' });
Order.belongsTo(Order, { foreignKey: 'order_id' });

// Связь между таблицами Product и Order (многие ко многим)
OrderProduct.belongsTo(Order);
OrderProduct.belongsTo(Product);

// Связь между таблицами Product и Color
Color.hasMany(Product, { as: 'colors', foreignKey: 'color_id' });
Product.belongsTo(Color, { foreignKey: 'color_id' });

// Связь между таблицами Product и Material
Material.hasMany(Product, { as: 'materials', foreignKey: 'material_id' });
Product.belongsTo(Material, { foreignKey: 'material_id' });

// Связь между таблицами Product и ProductSize
ProductSize.hasMany(Product, { as: 'product_sizes', foreignKey: 'product_size_id' });
Product.belongsTo(ProductSize, { foreignKey: 'product_size_id' });

// Связь между таблицами Product и ProductImage
Product.hasMany(ProductImage, { as: 'photos', foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

// Связь между таблицами Product и ProductCategory
ProductCategory.hasMany(Product, { as: 'product_categories', foreignKey: 'product_categories_id' });
Product.belongsTo(ProductCategory, { foreignKey: 'product_categories_id' });

// Связь между таблицами ProductCategory и PartCategory (многие ко многим)
PartProductCategory.belongsTo(ProductCategory);
PartProductCategory.belongsTo(PartCategory);

// Связь между таблицами Product и ProductCategory
PartCategory.hasMany(Part, { as: 'part_categories', foreignKey: 'part_category_id' });
Part.belongsTo(PartCategory, { foreignKey: 'part_category_id' });

// Связь между таблицами Product и Part
Product.hasMany(Part, { foreignKey: 'product_id' });
Part.belongsTo(Product, { foreignKey: 'product_id' });

// Связь между таблицами User и Review
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

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
  PartCategory,
  ProductCategory,
  PartProductCategory,
  OrderProduct
};