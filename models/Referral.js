const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Referral = sequelize.define("Referral", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  friendEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = { Referral };
