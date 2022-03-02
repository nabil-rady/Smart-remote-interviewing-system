const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');

const Notification = sequelize.define('Notification', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.hasMany(Notification, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = Notification;
