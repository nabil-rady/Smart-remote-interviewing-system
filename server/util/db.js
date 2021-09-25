// define db connection

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'root', 'pass', {
    host: './db.sqlite',
    dialect: 'sqlite'
});

module.exports = sequelize;