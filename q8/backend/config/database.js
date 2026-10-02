const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false // set to console.log to see SQL queries in console
});

module.exports = sequelize;
