"use strict";
const { formatRupiah } = require("../helpers/helper");
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

    get priceRupiah() {
      return formatRupiah(this.price);
    }
    get fullName() {
      return this.Category ? `${this.Category.name} - ${this.name}` : this.name;
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Price is required" },
          isInt: { msg: "Price must be an integer" },
          min: { args: [0], msg: "Price must be at least 0" },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Stock is required" },
          isInt: { msg: "Stock must be an integer" },
          min: { args: [0], msg: "Stock cannot be negative" },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Category is required" },
          isInt: { msg: "CategoryId must be an integer" },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image is required" },
          isUrl: { msg: "Image must be a valid URL" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
