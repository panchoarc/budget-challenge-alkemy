"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.operations);
    }
  }
  Users.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "users",
      tableName: "users",
      timestamps: true,
      paranoid: true,
    }
  );
  Users.prototype.dataUser = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.deletedAt;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  };

  return Users;
};
