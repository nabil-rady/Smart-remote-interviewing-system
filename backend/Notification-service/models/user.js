const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  verificationCode: {
    type: DataTypes.CHAR(8),
    allowNull: true,
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
  phoneCode: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: true,
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
  loggedIn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  emailConfirmed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  verificationCodeGenerationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  webNotificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobileNotificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
