import * as Tone from 'tone'

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

function Reader(sentence, speed, baseFreq, callback) {
  const voice = new Tone.FMSynth().toDestination()

  function addSoundOnQueue(note, duration, delay, word) {
    timedQueue.add(() => {
      voice.triggerAttackRelease(baseFreq+note, duration)
      callback(word)
    }, duration)
    timedQueue.add(() => {
      
    }, delay)
  }

  const phrase = sentence.match(/([a-zA-Z0-9\:\u00C0-\u00FF])+|\n|\.|,|\!|\?/gi) /// /[a-zA-Z\u00C0-\u00FF ]+/i
  let returnPhrase = ``
  phrase.forEach(word => {
    let size = word.length / (1.5*speed)
    const isExclamation = word==="!";
    const isInterrogation = word==="?";
    const isDot = word===".";
    const isComma = word===",";
    const isLineBreak = word==="\n";
    
    if (isInterrogation) {
      returnPhrase += word
      addSoundOnQueue(baseFreq*0.3, size / 100, 500 * size, returnPhrase)
    } else if (isExclamation) {
      returnPhrase += word
      addSoundOnQueue(baseFreq*-0.15, size / 100, 500 * size, returnPhrase)
    } else if (isComma) {
      returnPhrase += word
      addSoundOnQueue(baseFreq*-0.1, 0, 400 * size, returnPhrase)
    } else if (isDot) {
      returnPhrase += word
      addSoundOnQueue(baseFreq*-0.1, size / 30, 400 * size, returnPhrase)
    } else if (isLineBreak) {
      returnPhrase += word
      addSoundOnQueue(baseFreq*1, 0, 400 * size, returnPhrase)
    } else {
      returnPhrase += ` `+word
      addSoundOnQueue(baseFreq*0, size / 50, 50 * size, returnPhrase)
    }
  })
  timedQueue.start()
}

export default Reader
