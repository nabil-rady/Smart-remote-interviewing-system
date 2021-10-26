const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const JobListing = require('./jobListing');

const Interview = sequelize.define('Interview', {
  interviewId: {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneCode: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  listing: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    references: {
      model: JobListing,
      key: 'jobListingId',
    },
  },
  submitedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Interview.belongsTo(JobListing);
JobListing.hasMany(Interview, {
  foreignKey: 'listing',
  onDelete: 'CASCADE',
});

module.exports = Interview;
