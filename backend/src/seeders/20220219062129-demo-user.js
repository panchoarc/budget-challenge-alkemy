"use strict";

const { generateEncryptedPassword } = require("../helpers/PasswordEncrypter");

module.exports = {
  async up(queryInterface, Sequelize) {
    const general = await generateEncryptedPassword("12345678");
    await queryInterface.bulkInsert("users", [
      {
        name: "Demo User",
        email: "example@example.com",
        password: general,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Demo User 2",
        email: "example1@example.com",
        password: general,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
