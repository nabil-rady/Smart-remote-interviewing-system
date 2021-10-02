const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Interview = require('./interview');

const Video = sequelize.define('Video', {
  videoId: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interview: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    references: {
      model: Interview,
      key: 'interviewId',
    },
  },
});

Video.belongsTo(Interview);
Interview.hasMany(Video, {
  foreignKey: 'interview',
  onDelete: 'CASCADE',
});

module.exports = Video;
