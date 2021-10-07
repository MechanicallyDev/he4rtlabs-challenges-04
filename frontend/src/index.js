import React from 'react'
import ReactDOM from 'react-dom'
import Pokedex from './Pokedex'

import { ScreenProvider } from './Contexts/ScreenContext'
import { MusicProvider } from './Contexts/MusicContext'
import { SettingsProvider } from './Contexts/SettingsContext'
import { StateMachineProvider } from './Contexts/StateMachineContext'

import './cssReset.css'

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <MusicProvider>
        <ScreenProvider>
          <StateMachineProvider>
            <Pokedex />
          </StateMachineProvider>
        </ScreenProvider>
      </MusicProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
