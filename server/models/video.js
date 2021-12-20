const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Interview = require('./interview');
const Question = require('./question');

const Video = sequelize.define('Video', {
  videoId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Interview.hasMany(Video, {
  foreignKey: 'interviewId',
  onDelete: 'CASCADE',
});

Question.hasOne(Video, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
});

module.exports = Video;
