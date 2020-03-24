const router = require('express').Router()
const {Competition, Battle, User, Participant} = require('../db/models')
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
