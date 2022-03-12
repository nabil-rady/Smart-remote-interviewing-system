const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');

const RegistartionToken = sequelize.define('RegistartionToken', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
});

User.hasMany(RegistartionToken, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = RegistartionToken;
