import { useState, createContext, useContext } from 'react'

export const ScreenContext = createContext({})

export function ScreenProvider({ children }) {
  const [screen1, setScreen1] = useState('')
  const [screen2, setScreen2] = useState('')

  return (
    <ScreenContext.Provider
      value={{
        screen1,
        setScreen1,
        screen2,
        setScreen2
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}

export function useScreen() {
  const context = useContext(ScreenContext)

  if (context === undefined) {
    throw new Error('Context was used outside of its Provider')
  }

  return context
}
