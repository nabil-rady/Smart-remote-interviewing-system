const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const JobListing = require('./jobListing');

const Interview = sequelize.define('Interview', {
  interviewId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
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
  avgManualEvaluation: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  avgRecommendation: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  avgOpenPose: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  avgHappy: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  avgSad: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  avgAngry: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  avgNeutral: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  avgSurprise: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  processed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
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
