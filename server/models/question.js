const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const JobListing = require('./jobListing');

const Question = sequelize.define('Question', {
  questionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  statement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeToThink: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timeToAnswer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

JobListing.hasMany(Question, {
  foreignKey: 'jobListingId',
  onDelete: 'CASCADE',
});

module.exports = Question;
