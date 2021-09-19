import { useState } from 'react'
import styled from 'styled-components'
import Reader from '../Reader/Reader'

const dialog = `Oi, como vai você?
Espero que esteja bem!`

function DialogBar(props) {
  const [typedDialog, setTypedDialog] = useState('')

  function ShowDialog() {
    setTypedDialog('')
    Reader(dialog, 1, word => {
      setTypedDialog(word)
    })
  }
  return (
    <>
      <button onClick={() => ShowDialog()}>show dialog</button>
      <DialogBarStyled>{typedDialog}</DialogBarStyled>
    </>
  )
}

export default function Screen1(props) {
  return (
    <Screen1Styled>
      <DialogBar></DialogBar>
    </Screen1Styled>
  )
}

const Screen1Styled = styled.div`
  width: 100%;
  height: 100%;
  line-height: 1.4;
  position: relative;
`

const DialogBarStyled = styled.div`
  width: 100%;
  font-size: 0.85vh;
  padding: 1vh;
  border: 0.5vh dashed #22222299;
  position: absolute;
  bottom: 0;
  height: 33%;
  @media (orientation: landscape) and (min-width: 200vh) {
    font-size: 2vh;
  }
`
