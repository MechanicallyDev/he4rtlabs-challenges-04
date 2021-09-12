import * as gbs from 'gameboy-sound'

const male1 = {
  base: {
    channel: 1,
    freq: gbs.D3,
    volume: 15,
    fade: 2,
    duty: 1,
    pacing: 1 / 64
  },
  expressions: {
    exclamation: {
      freq: gbs.E3,
      volume: 15,
      fade: 1,
      sweepFactor: -7,
      sweepLength: 1,
      pacing: 1 / 32
    },
    question: {
      freq: gbs.F3,
      volume: 15,
      fade: 2,
      sweepFactor: 7,
      sweepLength: 2,
      pacing: 1 / 32
    },
    period: { pacing: 1 / 32 },
    fullstop: { pacing: 1 / 32 }
  }
}

export default male1