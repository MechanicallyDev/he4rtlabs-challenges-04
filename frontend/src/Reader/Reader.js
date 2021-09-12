import * as gbs from 'gameboy-sound'
import Male1 from './Voices/Male1'
import Female1 from './Voices/Female1'

const timedQueue = (function () {
  var API
  const queue = []
  var task = null
  var tHandle

  function next() {
    if (task !== null) {
      task.func()
      task = null
    }
    if (queue.length > 0) {
      task = queue.shift()
      tHandle = setTimeout(next, task.time)
    } else {
      API.done = true
    }
  }
  return (API = {
    add: function (func, time) {
      queue.push({ func: func, time: time })
    },
    start: function () {
      if (queue.length > 0 && API.done) {
        API.done = false
        tHandle = setTimeout(next, 0)
      }
    },
    clear: function () {
      task = null
      queue.length = 0
      clearTimeout(tHandle)
      API.done = true
    },
    done: true
  })
})()

async function Reader(sentence, vocal, speed = 1) {
  let voice
  if (vocal==='male1') voice = Male1
  if (vocal==='female1') voice = Female1


  // frequency = frequency of the sound
  // volume = pressure of the sound
  // sweepfactor= how fast the frequency sweeps, higher is slower
  // fade = how fast the sound fades out
  // duty = type of wave
  // pacing = how long the sound is played, higher is longer

  function addSoundOnQueue(
    channel,
    frequency,
    volume,
    sweepfactor,
    sweepLength,
    fade,
    duty,
    pacing,
    wordLength
  ) {
    timedQueue.add(() => {
      gbs.play(channel, [
        {
          freq: frequency,
          volume: volume,
          fade: (15 * fade * wordLength * pacing) / speed,
          sweepfactor: sweepfactor,
          sweepLength: sweepLength,
          duty: duty
        },
        (15 * wordLength * pacing) / speed
      ])
    }, (4000 * wordLength * pacing) / speed)
  }




  const phrase = sentence.match(/([a-zA-Z\u00C0-\u00FF])+|\.|,|\!|\?/gi) /// /[a-zA-Z\u00C0-\u00FF ]+/i
  console.log(sentence)
  phrase.forEach(word => {
    if (word === '?') {
      addSoundOnQueue(
        voice.base.channel,
        voice.expressions.question.freq,
        voice.expressions.question.volume,
        voice.expressions.question.sweepFactor,
        voice.expressions.question.sweepLength,
        voice.expressions.question.fade,
        voice.base.duty,
        voice.expressions.question.pacing,
        word.length
      )
    } else if (word === '!') {
      addSoundOnQueue(
        voice.base.channel,
        voice.expressions.exclamation.freq,
        voice.expressions.exclamation.volume,
        voice.expressions.exclamation.sweepFactor,
        voice.expressions.exclamation.sweepLength,
        voice.expressions.exclamation.fade,
        voice.base.duty,
        voice.expressions.exclamation.pacing,
        word.length
      )
    } else if (word === ',') {
      addSoundOnQueue(
        voice.base.channel,
        voice.base.freq,
        voice.base.volume,
        0,
        0,
        voice.base.fade,
        voice.base.duty,
        voice.base.pacing,
        word.length
      )
    } else if (word === '.') {
      addSoundOnQueue(
        voice.base.channel,
        voice.base.freq,
        voice.base.volume,
        0,
        0,
        voice.base.fade,
        voice.base.duty,
        voice.base.pacing,
        word.length
      )
    } else {
      addSoundOnQueue(
        voice.base.channel,
        voice.base.freq,
        voice.base.volume,
        0,
        0,
        voice.base.fade,
        voice.base.duty,
        voice.base.pacing,
        word.length
      )
    }
  })
  timedQueue.start()
}

export default Reader
