"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { min: 8 },
      },
      image: { type: Sequelize.STRING, defaultValue: "default.png" },
      facebook: { type: Sequelize.STRING, defaultValue: "" },
      fbTokens: Sequelize.ARRAY(Sequelize.TEXT),
      google: { type: Sequelize.STRING, defaultValue: "" },
      googleTokens: Sequelize.ARRAY(Sequelize.TEXT),
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
