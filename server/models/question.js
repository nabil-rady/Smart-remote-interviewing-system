const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const JobListing = require('./job-listing');

const Question = sequelize.define('Question', {
  questionId: {
    type: DataTypes.CHAR(8),
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
  jobListing: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    references: {
      model: JobListing,
      key: 'listingId',
    },
  },
});

Question.belongsTo(JobListing);
JobListing.hasMany(Question, {
  foreignKey: 'jobListing',
  onDelete: 'CASCADE',
});

module.exports = Question;
