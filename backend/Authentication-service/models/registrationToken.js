const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');

const RegistrationToken = sequelize.define('RegistrationToken', {
  registrationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(RegistrationToken, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = RegistrationToken;
