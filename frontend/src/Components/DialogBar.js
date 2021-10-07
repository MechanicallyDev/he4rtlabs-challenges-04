import { useState } from 'react'
import styled from 'styled-components'
import Reader from '../Reader/Reader'

const dialog = `Esta pokedéx ainda não está registrada para um treinador.

Para começar, crie um pokeregistro ou entre em seu pokeregistro com seu usuário e senha.
`

export default function DialogBar(props) {
  const [typedDialog, setTypedDialog] = useState(``)
  const [dialogSpeed, setDialogSpeed] = useState(1)
  const [frequency, setFrequency] = useState(150)

  function ShowDialog(text, speed, voice) {
    setTypedDialog(``)
    Reader(text, speed, voice, phrase => {
      setTypedDialog(phrase)
    })
  }

  return (
    <>
      {/* <div style={{display:'flex'}}>
        <span>Speed: </span>
        <button onClick={() => setDialogSpeed(.5)}>Slow</button>
        <button onClick={() => setDialogSpeed(1)}>Regular</button>
        <button onClick={() => setDialogSpeed(1.5)}>Fast</button>
      </div>
      <div style={{display:'flex'}}>
        <span>Frequency: </span>
        <button onClick={() => setFrequency(frequency*(1-0.2))}>-</button>
        <span>{Math.round(frequency)}</span>
        <button onClick={() => setFrequency(frequency*(1+0.2))}>+</button>
      </div>
      <button onClick={() => ShowDialog(dialog, dialogSpeed, frequency)}>Start Dialog</button> */}
      <DialogBarStyled>{typedDialog}</DialogBarStyled>
    </>
  )
}

const DialogBarStyled = styled.div`
  width: 100%;
  font-size: 0.85vh;
  padding: 1vh;
  border: 0.5vh dashed #22222299;
  position: absolute;
  bottom: 0;
  height: 33%;
  white-space: pre-line;

  @media (orientation: landscape) and (min-width: 200vh) {
    font-size: 2vh;
  }
`
