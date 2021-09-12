import { useState } from 'react'
import styled from 'styled-components'

import Screen from './Components/Screen'

function App() {
  const [brightness, setBrightness] = useState(100)
  return (
    <Background>
      <Container>
        <Machine>
          <Screen brightness={brightness}>
            <h1>Pokedex</h1>
          </Screen>
        </Machine>
        <Machine>
          <Screen brightness={brightness}>
            <h1>Pokedex</h1>
          </Screen>
        </Machine>
      </Container>
    </Background>
  )
}

export default App

const Background = styled.div`
  background-color: #000;
  position: absolute;
  top: 0;
  bottom: 0; /* vertical center */
  left: 0;
  right: 0;

  background: url(background.png);
  background-repeat: no-repeat;
  background-position-y: 70%;
  background-size: cover;
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

const Machine = styled.div`
  background-color: #dd4d4d;
  box-shadow: .5vh 1vh 0vh #9e3838;
  width: 100%;
  height: 90vh;
  border-radius: 2vh;
  padding: 1vh;
  display: flex;
  flex-direction: column;
  border: .3vh solid rgba(255, 255, 255, 0.10);
`
