const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // phoneCode: {
  //   type: DataTypes.STRING(5),
  //   allowNull: true,
  // },
  // phoneNumber: {
  //   type: DataTypes.STRING(15),
  //   allowNull: true,
  // },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
