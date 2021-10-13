const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Question = require('./question');

const Keyword = sequelize.define('Keyword', {
  keywordId: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    references: {
      model: Question,
      key: 'questionId',
    },
  },
});

Keyword.belongsTo(Question);
Question.hasMany(Keyword, {
  foreignKey: 'question',
  onDelete: 'CASCADE',
});

module.exports = Keyword;
