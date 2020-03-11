export class Bracket {
  constructor(top, bottom, eventId, winner = null) {
    this.winner = winner
    this.top = top
    this.bottom = bottom
    this.eventId = eventId
  }
}

export class Competition {
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
}
