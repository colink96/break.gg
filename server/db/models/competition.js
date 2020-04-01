const Sequelize = require('sequelize')
const db = require('../db')

const Competition = db.define('competition', {
  name: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
  date: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
  time: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {notEmpty: true}
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  started: {type: Sequelize.BOOLEAN, defaultValue: false}
})

module.exports = Competition
