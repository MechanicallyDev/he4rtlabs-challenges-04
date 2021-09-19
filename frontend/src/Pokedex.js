import { useState } from 'react'
import styled from 'styled-components'

import Device from './Components/Device'
import { useMusic } from './Contexts/MusicContext'

function Pokedex() {
  const music = useMusic()

  const [started, setStarted] = useState(false)

  const [brightness, setBrightness] = useState(50)

  function HandleChangeMusic(song) {
    music.playMusic(song)
  }

  function HandleStopMusic(){
    music.stopMusic()
  }

  function handleStart() {
    setStarted(true)
    HandleChangeMusic('pallet')
  }

  return (
    <>
      <Background />
      <Container>
        {!started && (
          <StartButton onClick={() => handleStart()}>
            Iniciar Pokedex
          </StartButton>
        )}

        {started && (
          <>
            <Device brightness={brightness}>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecorationLine: 'underline',
                }}
                onClick={() => HandleStopMusic()}
              >
                Stop Music
              </button>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecorationLine: 'underline',
                }}
                onClick={() => HandleChangeMusic('titlescreen')}
              >
                start Music
              </button>
            </Device>
            <Device brightness={brightness}>
              <div className='hinge1' />
              <div className='hinge2' />
              <h1>Pokedex</h1>
            </Device>
          </>
        )}
      </Container>
    </>
  )
}

export default Pokedex

const StartButton = styled.button`
  box-shadow: inset 0px 1px 0px 0px #cf866c;
  background: linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
  background-color: #d0451b;
  border-radius: 3px;
  border: 1px solid #942911;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 13px;
  padding: 4vh 4vh;
  text-decoration: none;
  text-shadow: 0px 1px 0px #854629;
  font-family: 'Press Start 2P', cursive;

  &:hover {
    background: linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
    background-color: #bc3315;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`

const Background = styled.div`
  background-color: #000;
  position: absolute;
  top: 0;
  bottom: 0; /* vertical center */
  left: 0;
  right: 0;

  background: url(background.png);
  background-repeat: repeat;
  background-position-y: 70%;
  background-size: cover;
  animation: animatedBackground 10000s linear infinite;

  @keyframes animatedBackground {
    from {
      background-position: 0 70%;
    }
    to {
      background-position: -140000px 70%;
    }
  }
`

const Container = styled.div`
  max-height: 100vh;
  max-width: 56.25vh; /*16/9 = 0,5625  */

  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0; /* vertical center */
  left: 0;
  right: 0; /* horizontal center */

  width: 100%;
  height: 100vh;
  padding: 5vh 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5vh;

  @media (orientation: landscape) and (min-width: 200vh) {
    flex-direction: row;
    max-width: 200vh;
    width: 200vh;
  }
`
