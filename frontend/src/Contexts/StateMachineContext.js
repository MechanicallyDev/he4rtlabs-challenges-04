import { useState, createContext, useContext } from 'react'

export const StateMachineContext = createContext({})

export function StateMachineProvider({ children }) {
  const [state, setState] = useState('')

  function Start() {
    setState('start')
  }

  return (
    <StateMachineContext.Provider
      value={{
        state,
        Start
      }}
    >
      {children}
    </StateMachineContext.Provider>
  )
}

export function useStateMachine() {
  const context = useContext(StateMachineContext)

  if (context === undefined) {
    throw new Error('Context was used outside of its Provider')
  }

  return context
}
