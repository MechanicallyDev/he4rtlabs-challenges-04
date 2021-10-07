import { useState, createContext, useContext } from 'react'
import * as Tone from 'tone'

import { useSettings } from './SettingsContext'
import Songlist from '../Songs/Songlist'

export const MusicContext = createContext({})

export function MusicProvider({ children }) {
  const { audio: settings } = useSettings()
  const [isMusicPlaying, setMusicPlaying] = useState(true)

  let synths = []

  function stopMusic() {
    setMusicPlaying(false)
    Tone.Transport.stop()
    Tone.Transport.cancel(0)
    synths.forEach(synth => {
      synth.dispose()
    })
  }

  function playMusic(songName) {
    stopMusic()

    const song = Songlist(songName)

    setMusicPlaying(true)
    if (song && Tone.Transport.state === 'stopped') {
      song.tracks.forEach((track, index) => {
        synths[index] = new Tone.Synth().toDestination()
        synths[index].volume.value = settings.musicVolume
        const part = new Tone.Part((time, note) => {
          synths[index].triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          );
        }, track.notes).start(0)
        part.loop = false
      })
      Tone.Transport.start()
    }
  }

  return (
    <MusicContext.Provider value={{ isMusicPlaying, playMusic, stopMusic }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)

  if (context === undefined) {
    throw new Error('Context was used outside of its Provider')
  }

  return context
}
