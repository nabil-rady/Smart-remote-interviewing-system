const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
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
  // creator: {
  //   type: DataTypes.CHAR(8),
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'userId',
  //   },
  // },
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
