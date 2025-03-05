'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User)
        }
    }
    Profile.init({
        name: {
            type: DataTypes.STRING,
            msg: "Name is Required"
        },
        phone: {
            type: DataTypes.STRING,
            msg: "Phone is Required"
        },
        address: {
            type: DataTypes.STRING,
            msg: "Address is Required"
        },
        UserId: {
            type: DataTypes.INTEGER,
            msg: "UserId is Required"
        }
    }, {
        sequelize,
        modelName: 'Profile',
    });
    return Profile;
};