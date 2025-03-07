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

        static async updateOneAttribute(userId, field, value) {
            try {
                let profile = await Profile.findOne({ where: { UserId: userId } });
                if (!profile) throw new Error("Profile not found");
                profile[field] = value
                await profile.save()
                console.log(profile.changed());
                // if (!profile.changed()) throw new Error("Failed Updating");
                return profile;
            } catch (error) {
                throw new Error(error.message);
            }
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
            type: DataTypes.TEXT,
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