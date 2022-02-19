"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      "users",
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "users",
        tableName: "users",
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  },
};
