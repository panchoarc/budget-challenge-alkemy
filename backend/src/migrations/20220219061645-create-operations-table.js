"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      "operations",
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        concept: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        amount: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM,
          values: ["INCOME", "EXPENSE"],
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
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        modelName: "operations",
        tableName: "operations",
        timestamps: true,
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("operations");
  },
};
