class Bracket {
  constructor(top, bottom, eventId, winner = null) {
    this.winner = winner
    this.top = top
    this.bottom = bottom
    this.eventId = eventId
  }
}

class Competition {
  constructor(eventId) {
    this.participants = []
    this.eventId = eventId
    this.started = false
    this.bracket = new Bracket(null, null, this.eventId)
  }

  addParticipant(participant) {
    if (!this.started) {
      this.participants.push(participant)
      return true
    } else {
      console.log('This event has already begun. Cannot add more participants.')
      return false
    }
  }

  seed() {
    let participantsCopy = [...this.participants]
    let result = []
    while (participantsCopy.length > 0) {
      result.push(participantsCopy.pop())
      result.push(participantsCopy.shift())
    }

    this.participants = result
  }

  buildBracket(
    participantsToAdd = [...this.participants],
    currentBracket = this.bracket
  ) {
    if (participantsToAdd.length === 2) {
      currentBracket.top = new Bracket(
        null,
        null,
        this.eventId,
        participantsToAdd.pop()
      )
      currentBracket.bottom = new Bracket(
        null,
        null,
        this.eventId,
        participantsToAdd.pop()
      )
      return currentBracket
    } else if (participantsToAdd.length > 2) {
      let bracketTop = new Bracket(null, null, this.eventId)
      currentBracket.top = this.buildBracket(
        participantsToAdd.slice(0, participantsToAdd.length / 2),
        bracketTop
      )
      let bracketBottom = new Bracket(null, null, this.eventId)
      currentBracket.bottom = this.buildBracket(
        participantsToAdd.slice(participantsToAdd.length / 2),
        bracketBottom
      )
      return currentBracket
    }
  }

  start() {
    if (this.started) {
      console.log('Already started!')
    } else {
      this.started = true
      this.seed()
      this.buildBracket()
    }
  }
}

let test = new Competition('test')
test.addParticipant('1')
test.addParticipant('2')
test.addParticipant('3')
test.addParticipant('4')
console.log('Current Participants: ', test.participants)
console.log('Building Bracket...')
test.start()
console.log(JSON.stringify(test.bracket))
console.log(JSON.parse(JSON.stringify(test.bracket)))

module.exports = {Competition, Bracket}
