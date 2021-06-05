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

        validate: { min: 8 },
      },
      image: { type: Sequelize.STRING, defaultValue: "default.png" },
      facebook: { type: Sequelize.STRING, defaultValue: "" },
      fbTokens: { type: Sequelize.STRING },
      google: { type: Sequelize.STRING, defaultValue: "" },
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
