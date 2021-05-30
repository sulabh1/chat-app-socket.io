"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { min: 8 },
      },
      image: { type: DataTypes.STRING, defaultValue: "default.png" },
      facebook: { type: DataTypes.STRING, defaultValue: "" },
      fbTokens: DataTypes.ARRAY(DataTypes.TEXT),
      google: { type: DataTypes.STRING, defaultValue: "" },
      googleTokens: DataTypes.ARRAY(DataTypes.TEXT),
    },

    {
      hooks: {
        beforeCreate: async (users, options) => {
          {
            users.password =
              users.password && users.password !== ""
                ? await bcrypt.hashSync(users.password, 12)
                : "";
          }
        },
      },

      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
