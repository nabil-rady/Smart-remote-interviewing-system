const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const User = require('./user');

const JobListing = sequelize.define('JobListing', {
  listingId: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  creator: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    references: {
      model: User,
      key: 'userId',
    },
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

JobListing.belongsTo(User);
User.hasMany(JobListing, {
  foreignKey: 'creator',
  onDelete: 'CASCADE',
});

module.exports = JobListing;
