const Sequelize = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = process.env.DB_DIALECT;
const dbPort = process.env.DB_PORT;

const connection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    dialectOptions: {
      options: {
        requestTimeout: 1000000
      }
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    port: dbPort,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
});

module.exports = connection;