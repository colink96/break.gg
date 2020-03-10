class Bracket {
  constructor(top, bottom, eventId, winner = null) {
    this.winner = winner
    this.top = top
    this.bottom = bottom
    this.eventId = eventId
  }
}

class Event {
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

  buildBracket(participantsToAdd = [...this.participants]) {
    if (participantsToAdd.length === 2) {
      let bracket = new Bracket(
        new Bracket(null, null, this.eventId, participantsToAdd.pop()),
        new Bracket(null, null, this.eventId, participantsToAdd.pop()),
        this.eventId
      )
      return bracket
    } else {
      let top = participantsToAdd.splice(0, participantsToAdd.length / 2)
      let bottom = participantsToAdd.splice(participantsToAdd.length / 2)
    }
  }
}
