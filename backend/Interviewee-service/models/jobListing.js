const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');

const JobListing = sequelize.define('JobListing', {
  jobListingId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  positionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(JobListing, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = JobListing;
