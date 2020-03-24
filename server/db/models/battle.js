const Sequelize = require('sequelize')
const db = require('../db')

const Battle = db.define('battle', {
  round: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {notEmpty: false}
  },
  match: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {notEmpty: false}
  }
})

module.exports = Battle
