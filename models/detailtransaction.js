"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product);
      this.belongsTo(models.Transaction);
    }
  }
  DetailTransaction.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Quantity is required" },
          isInt: { msg: "Quantity must be an integer" },
          min: { args: [1], msg: "Quantity must be at least 1" },
        },
      },
      TransactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Transaction is required" },
          isInt: { msg: "TransactionId must be an integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "DetailTransaction",
    }
  );
  return DetailTransaction;
};
