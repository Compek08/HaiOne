"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Profile);
            this.hasMany(models.Transaction);
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: "Username is required" },
                    notEmpty: { msg: "Username cannot be empty" },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: { msg: "Must be a valid email" },
                    notNull: { msg: "Email is required" },
                    notEmpty: { msg: "Email cannot be empty" },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Password is required" },
                    notEmpty: { msg: "Password cannot be empty" },
                    len: {
                        args: [6, 100],
                        msg: "Password must be at least 6 characters",
                    },
                },
            },
            role: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: (user) => {
                    user.role = "user"
                    const salt = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(user.password, salt);
                },
            },
        }
    );

    User.beforeCreate = (user) => {
        user.role = "user"
    }

    return User;
};
