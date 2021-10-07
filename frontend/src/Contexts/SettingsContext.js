import { useState, createContext, useContext } from 'react'

export const SettingsContext = createContext({})

export function SettingsProvider({ children }) {
  localStorage.getItem('@pokedex/musicVolume')

  const [screenBrightness, setScreenBrightness] = useState(
    localStorage.getItem('@mechpokedex/screenBrightness') || 50
  )
  const [audio, setAudio] = useState({
    musicVolume: localStorage.getItem('@mechpokedex/musicVolume') || -12,
    dialogVolume: localStorage.getItem('@mechpokedex/dialogVolume') || -6
  })
  const [dialogSpeed, setDialogSpeed] = useState(
    localStorage.getItem('@mechpokedex/dialogVolume') || 1
  )

  function changeVolume(device, volume) {
    if (volume === undefined) return
    if (audio[device] === undefined)
      throw Error(`Device ${device} was not found`)

    let db = -60 * (1 - volume / 10) + -6 * (volume / 10)
    if (volume === 0) db = -Infinity
    setAudio({ ...audio, [device]: db })
    localStorage.setItem(`@mechpokedex/${device}`, db)
  }

  function changeScreenBrightness(brightness) {
    if (brightness === undefined) return
    setScreenBrightness(brightness)
    localStorage.setItem('@mechpokedex/screenBrightness', brightness)
  }

  function changeDialogSpeed(speed) {
    setDialogSpeed(speed)
  }

  return (
    <SettingsContext.Provider
      value={{
        dialogSpeed,
        audio,
        screenBrightness,
        changeVolume,
        changeScreenBrightness,
        changeDialogSpeed
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('Context was used outside of its Provider')
  }

  return context
}
