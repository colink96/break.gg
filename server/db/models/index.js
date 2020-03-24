const User = require('./user')
const Battle = require('./battle')
const Competition = require('./competition')
const Matchup = require('./matchup')
const Participant = require('./participant')

User.belongsToMany(Battle, {through: Matchup})
Battle.belongsToMany(User, {through: Matchup})

User.hasMany(Battle)
Battle.belongsTo(User)

User.belongsToMany(Competition, {through: Participant})
Competition.belongsToMany(User, {through: Participant})

Competition.hasMany(Battle)
Battle.belongsTo(Competition)
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Battle,
  Competition,
  Matchup,
  Participant
}
