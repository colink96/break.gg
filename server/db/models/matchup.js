const Sequelize = require('sequelize')
const db = require('../db')

const Matchup = db.define('matchup', {
  win: Sequelize.BOOLEAN
})

module.exports = Matchup
