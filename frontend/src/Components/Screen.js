import styled from 'styled-components'
import { Clamp, Lerp, PercentageToHEX } from '../Utils/MathFunctions'

export default function Screen(props) {
  const { brightness = 50, children } = props

  const brightnessClamp = Clamp(7, 100, brightness)
  const brightnessHEX = PercentageToHEX(brightnessClamp)
  const brightnessLerp = Lerp(60,80,brightnessClamp)
  
  return (
    <ScreenStyled
      brightness={brightnessHEX}
      brightnessPercentage={brightnessLerp}
    >
      {children}
    </ScreenStyled>
  )
}

const ScreenStyled = styled.div`
  --color-brightness-hover: ${props => `#ddffdd${props.brightness}`};
  --brightness: ${props => props.brightnessPercentage}%;
  flex: 1;
  margin: 2vh auto;
  width: 95%;
  height: 95%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #628831 0%,
    #7e914a var(--brightness),
    #8c9d47 100%
  );
  border: 4px solid #6e3838;
  border-bottom: 0;
  border-right: 0;
  border-radius: 1vh;
  padding: 2vh;
  color: #22222299;
  font-size: 2vh;
  line-height: 1.6vh;
  font-weight: 700;
  overflow: hidden;
  box-shadow: inset -2vh 0px 20vh var(--color-brightness-hover),
    0px 0px 3vh var(--color-brightness-hover), inset .2vh .2vh .8vh #000000aa;
`
