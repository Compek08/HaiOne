'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Profile)
            this.hasMany(models.Transaction)
        }
    }
    User.init({
        username: {
            type: DataTypes.STRING,
            msg: "Username is Required"
        },
        email: {
            type: DataTypes.STRING,
            msg: "Email is Required"
        },
        password: {
            type: DataTypes.STRING,
            msg: "Password is Required"
        },
        role: {
            type: DataTypes.STRING,
            msg: "Role is Required"
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};