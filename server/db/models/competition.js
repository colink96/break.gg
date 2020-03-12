const Sequelize = require('sequelize')
const db = require('../db')

const Competition = db.define('competition', {
  started: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false},
  bracket: {type: Sequelize.TEXT, allowNull: false}
})

module.exports = Competition
