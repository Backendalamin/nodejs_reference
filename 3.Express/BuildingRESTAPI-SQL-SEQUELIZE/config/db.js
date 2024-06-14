const { Sequelize } = require("sequelize");
const personModel = require("../models/person.model");
require("dotenv").config();

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.SQL_PORT,
  dialect: process.env.DIALECT,
  dialectModule: require('tedious'),
  dialectOptions: {
    options: {
      encrypt: false,
      trustedConnection: true
    },
    authentication: {
      type: 'default',
      options: {
        userName: process.env.USER,
        password: process.env.PASSWORD
      }
    }
  }
});

const db = {};
db.Person = personModel(sequelize);
// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
