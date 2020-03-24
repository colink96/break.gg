'use strict'

const db = require('../server/db')
const {
  User,
  Competition,
  Battle,
  Matchup,
  Participant
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const comps = await Promise.all([
    Competition.create({
      name: 'Breaks U',
      day: 28,
      month: 3,
      year: 2020,
      location: 'Suffolk Street'
    }),
    Competition.create({
      name: 'My Jam',
      day: 20,
      month: 4,
      year: 2020,
      location: 'My House'
    })
  ])

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', name: 'cody'}),
    User.create({email: 'murphy@email.com', password: '123', name: 'murphy'})
  ])

  const participants = await Promise.all([
    Participant.create({userId: 1, competitionId: 1}),
    Participant.create({userId: 2, competitionId: 1})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
