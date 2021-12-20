const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const JobListing = require('./jobListing');

const Interview = sequelize.define('Interview', {
  interviewId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  // firstName: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // lastName: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  name: {
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
  invitationCode: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    unique: true,
  },
  started: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  submitedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
});

JobListing.hasMany(Interview, {
  foreignKey: 'jobListingId',
  onDelete: 'CASCADE',
});

module.exports = Interview;
