'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.DetailTransaction)
            this.belongsTo(models.User)
        }
    }
    Transaction.init({
        status: {
            type: DataTypes.STRING,
            msg: "Status is Required"
        },
        UserId: {
            type: DataTypes.INTEGER,
            msg: "User is Required"
        }
    }, {
        sequelize,
        modelName: 'Transaction',
    });
    return Transaction;
};