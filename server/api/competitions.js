/* eslint-disable complexity */
const router = require('express').Router()
const {
  Competition,
  Battle,
  User,
  Participant,
  Matchup
} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const comps = await Competition.findAll()
    res.send(comps)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const comp = await Competition.create({
      name: req.body.name,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      location: req.body.location
    })
    res.send(comp)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const comp = await Competition.findByPk(req.params.id, {
      include: [{model: User}, {model: Battle}]
    })
    res.send(comp)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const comp = await Competition.findByPk(req.params.id)
    const participants = await Participant.findAll({
      where: {competitionId: req.params.id}
    })
    let participantsCopy = [...participants]
    if (comp.started) {
      res.send(comp)
    } else if (
      participants.length === 2 ||
      participants.length === 4 ||
      participants.length === 8 ||
      participants.length === 16 ||
      participants.length === 32 ||
      participants.length === 64
    ) {
      comp.started = true
      await comp.save()
      let matchCounter = participants.length / 2
      let roundCounter = 0
      while (matchCounter >= 1) {
        for (let i = 0; i < matchCounter; i++) {
          let battle = await Battle.create({
            round: roundCounter,
            match: i,
            competitionId: req.params.id
          })
          if (roundCounter === 0) {
            await Matchup.create({
              win: false,
              userId: participantsCopy.pop().userId,
              battleId: battle.id
            })
            await Matchup.create({
              win: false,
              userId: participantsCopy.pop().userId,
              battleId: battle.id
            })
          }
        }
        matchCounter = matchCounter / 2
        roundCounter += 1
      }
      res.send(comp)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const comp = await Competition.findByPk(req.params.id)
    if (comp) {
      await comp.destroy()
      res.status(200).send(comp)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id/participants', async (req, res, next) => {
  try {
    const participants = await Participant.findAll({
      where: {competitionId: req.params.id}
    })
    res.send(participants)
  } catch (error) {
    next(error)
  }
})

router.post('/:id/participants', async (req, res, next) => {
  try {
    const newParticipant = await Participant.create({
      userId: req.body.userId,
      competitionId: req.params.id
    })
    res.send(newParticipant)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id/participants', async (req, res, next) => {
  try {
    const participant = await Participant.findOne({
      where: {userId: req.body.userId, competitionId: req.params.id}
    })
    if (participant) {
      await participant.destroy()
      res.status(200).send(participant)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id/battles', async (req, res, next) => {
  try {
    const battles = await Battle.findAll({
      where: {competitionId: req.params.id},
      include: {model: User}
    })
    res.send(battles)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/battles/:round/:match', async (req, res, next) => {
  try {
    const battle = await Battle.findOne({
      where: {
        competitionId: req.params.id,
        round: req.params.round,
        match: req.params.match
      },
      include: {model: User}
    })
    res.send(battle)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/battles/:round/:match', async (req, res, next) => {
  try {
    const battle = await Battle.findOne({
      where: {
        competitionId: req.params.id,
        round: req.params.round,
        match: req.params.match
      },
      include: {model: User}
    })
    if (!battle.userId) {
      const winner = await User.findByPk(req.body.userId)
      if (winner) {
        const matchup = await Matchup.findOne({
          where: {battleId: battle.id, userId: winner.id}
        })
        battle.userId = req.body.userId
        matchup.win = true
        await battle.save()
        await matchup.save()
      }
    }
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
