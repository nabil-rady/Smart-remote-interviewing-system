const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Question = require('./question');

const Keyword = sequelize.define('Keyword', {
  keywordId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Question.hasMany(Keyword, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE',
});

module.exports = Keyword;
