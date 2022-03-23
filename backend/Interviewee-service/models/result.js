const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Question = require('./question');
const Interview = require('./interview');

const Result = sequelize.define('Result', {
  interviewId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  questionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  manualEvaluation: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  recommendation: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  openPose: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  happy: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  angry: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  sad: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  surprise: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  neutral: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
});

Question.hasMany(Result, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
});

Interview.hasMany(Result, {
  foreignKey: 'interviewId',
  onDelete: 'CASCADE',
});

module.exports = Result;
