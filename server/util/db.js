// define db connection
const path = require("path");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'root', 'pass', {
    storage: path.join(__dirname, '..', 'db.sqlite'),
    host: 'localhost',
    dialect: 'sqlite',
});

module.exports = sequelize;
