const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Interview = require('./interview');

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
  // interview: {
  //   type: DataTypes.CHAR(8),
  //   allowNull: false,
  //   references: {
  //     model: Interview,
  //     key: 'interviewId',
  //   },
  // },
});

Interview.hasMany(Video, {
  foreignKey: 'interviewId',
  onDelete: 'CASCADE',
});

module.exports = Video;
