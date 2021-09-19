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

function Reader(sentence, speed = 1, callback) {
  const voice = new Tone.FMSynth().toDestination()

  function addSoundOnQueue(note, duration, delay, word) {
    timedQueue.add(() => {
      voice.triggerAttackRelease(note, duration)
      callback(word)
    }, delay)
  }

  const phrase = sentence.match(/([a-zA-Z\u00C0-\u00FF])+|\.|,|\!|\?/gi) /// /[a-zA-Z\u00C0-\u00FF ]+/i
  let returnPhrase = ''
  phrase.forEach(word => {
    let size = word.length / speed
    const isExclamation = word==="!";
    const isInterrogation = word==="?";
    const isDot = word===".";
    const isComma = word===",";
    
    if (isInterrogation) {
      returnPhrase += word
      addSoundOnQueue('E3', size / 30, 100 * size, returnPhrase)
    } else if (isExclamation) {
      returnPhrase += word
      addSoundOnQueue('D3', size / 30, 100 * size, returnPhrase)
    } else if (isComma) {
      returnPhrase += word
      addSoundOnQueue('B3', size / 30, 150 * size, returnPhrase)
    } else if (isDot) {
      returnPhrase += word
      addSoundOnQueue('B3', size / 30, 150 * size, returnPhrase)
    } else {
      returnPhrase += ` `+word
      addSoundOnQueue('C3', size / 30, 50 * size, returnPhrase)
    }
  })
  timedQueue.start()
}

export default Reader
