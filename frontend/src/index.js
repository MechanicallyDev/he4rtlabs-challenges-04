import React from 'react'
import ReactDOM from 'react-dom'
import Pokedex from './Pokedex'

import { MusicProvider } from './Contexts/MusicContext'

import './cssReset.css'

ReactDOM.render(
  <React.StrictMode>
    <MusicProvider>
      <Pokedex />
    </MusicProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
