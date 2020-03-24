const Sequelize = require('sequelize')
const db = require('../db')

const Competition = db.define('competition', {
  name: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
  day: {type: Sequelize.INTEGER, allowNull: false, validate: {notEmpty: true}},
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {notEmpty: true}
  },
  year: {type: Sequelize.INTEGER, allowNull: false, validate: {notEmpty: true}},
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  started: {type: Sequelize.BOOLEAN, defaultValue: false}
})

module.exports = Competition
