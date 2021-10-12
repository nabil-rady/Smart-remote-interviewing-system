// define db connection
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.db,
  process.env.dbRoot,
  process.env.dbPassowrd,
  {
    host: process.env.host,
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
  }
);

module.exports = sequelize;
