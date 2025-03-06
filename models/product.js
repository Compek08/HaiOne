"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category);
      this.hasMany(models.DetailTransaction);

      this.addScope("defaultHook", { include: models.Category });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        msg: "Name is Required",
      },
      description: {
        type: DataTypes.TEXT,
        msg: "Description is Required",
      },
      price: {
        type: DataTypes.INTEGER,
        msg: "Price is Required",
      },
      stock: {
        type: DataTypes.INTEGER,
        msg: "Stock is Required",
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        msg: "Category is Required",
      },
      image: {
        type: DataTypes.STRING,
        msg: "Image is Required",
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
