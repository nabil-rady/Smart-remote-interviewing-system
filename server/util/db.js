// define db connection
const { Sequelize } = require('sequelize');
const dbconfig = require('../dbconfig.json');

const sequelize = new Sequelize(dbconfig.db, dbconfig.root, dbconfig.passowrd, {
  host: dbconfig.host,
  dialect: 'mysql',
  port: 5878,
  dialectOptions: {
    ssl: 'Amazon RDS',
    connectTimeout: 100000,
  },
  maxConcurrentQueries: 100,
  pool: { maxConnections: 5, maxIdleTime: 30 },
  logging: console.log,
  language: 'en',
});

module.exports = sequelize;
