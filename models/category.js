'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Product)
        }
    }
    Category.init({
        name: {
            type: DataTypes.STRING,
            msg: "Name is Required"
        },
        description: {
            type: DataTypes.TEXT,
            msg: "Decription is Required"
        }
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};