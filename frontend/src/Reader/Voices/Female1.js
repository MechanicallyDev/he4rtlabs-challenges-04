import * as gbs from 'gameboy-sound'

const female1 = {
  base: {
    channel: 0,
    freq: gbs.C6,
    volume: 15,
    fade: 3,
    duty: 2,
    pacing: 1 / 64
  },
  expressions: {
    exclamation: {
      freq: gbs.D6,
      volume: 15,
      fade: .8,
      sweepFactor: 7,
      sweepLength: 1,
      pacing: 1 / 8
    },
    question: {
      freq: gbs.E6,
      volume: 15,
      fade: 2,
      sweepFactor: -7,
      sweepLength: 1,
      pacing: 1 / 8
    },
    period: { pacing: 1 / 16 },
    fullstop: { pacing: 1 / 4 }
  }
}

export default female1