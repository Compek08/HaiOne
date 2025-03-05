'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailTransaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Product)
            this.belongsTo(models.Transaction)
        }
    }
    DetailTransaction.init({
        quantity: {
            type: DataTypes.INTEGER,
            msg: "Quantity is Required"
        },
        TransactionId: {
            type: DataTypes.INTEGER,
            msg: "Transaction is Required"
        },
        ProductId: {
            type: DataTypes.INTEGER,
            msg: "Product is Required"
        }
    }, {
        sequelize,
        modelName: 'DetailTransaction',
    });
    return DetailTransaction;
};