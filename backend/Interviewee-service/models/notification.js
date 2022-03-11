const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = require('./user');
const Interview = require('./interview');

const Notification = sequelize.define('Notification', {
  notificationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  interviewId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
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
  manualRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.hasMany(Notification, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Interview.hasOne(Notification, {
  foreignKey: 'interviewId',
  onDelete: 'CASCADE',
});

module.exports = Notification;
