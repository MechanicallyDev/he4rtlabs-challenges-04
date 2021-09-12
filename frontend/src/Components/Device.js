import styled from 'styled-components'
import { Clamp, Lerp, PercentageToHEX } from '../Utils/MathFunctions'

export default function Device(props) {
  const { brightness = 50, children } = props

  const brightnessClamp = Clamp(7, 100, brightness)
  const brightnessHEX = PercentageToHEX(brightnessClamp)
  const brightnessLerp = Lerp(60, 80, brightnessClamp)

  return (
    <Machine>
      <ScreenStyled
        brightness={brightnessHEX}
        brightnessPercentage={brightnessLerp}
      >
        {children}
      </ScreenStyled>
    </Machine>
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
  box-shadow: inset -2vh 0px 20vh var(--color-brightness-hover),
    0px 0px 3vh var(--color-brightness-hover), inset 0.2vh 0.2vh 0.8vh #000000aa;

  .hinge1 {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -8vh) translateX(-12vh);
    z-index: 10;
    background: linear-gradient(
      to bottom,
      #ff4d4d 0%,
      #dd4d4d 75%,
      #6e3838 100%
    );
    border: 0.3vh solid rgba(0, 0, 0, 0.1);
    border-top: 0;
    border-bottom: 0;
    border-radius: 0.4vh;
    height: 4vh;
    width: 4vh;
    box-shadow: 0.2vh 0.2vh 0.4vh #00000077;

    @media (orientation: landscape) and (min-width: 200vh) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) translateY(-18vh) rotateZ(-90deg);
      box-shadow: -0.2vh 0.2vh 0.4vh #00000077;
    }
  }

  .hinge2 {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -8vh) translateX(+12vh);
    z-index: 10;
    background: linear-gradient(
      to bottom,
      #ff4d4d 0%,
      #dd4d4d 75%,
      #6e3838 100%
    );
    border: 0.3vh solid rgba(0, 0, 0, 0.1);
    border-top: 0;
    border-bottom: 0;
    border-radius: 0.4vh;
    height: 4vh;
    width: 4vh;
    box-shadow: 0.2vh 0.2vh 0.4vh #00000077;

    @media (orientation: landscape) and (min-width: 200vh) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) translateY(18vh) rotateZ(-90deg);
      box-shadow: -0.2vh 0.2vh 0.4vh #00000077;
    }
  }
`

const Machine = styled.div`
  background-color: #dd4d4d;
  box-shadow: 0.5vh 1vh 0vh #9e3838;
  width: 100%;
  height: 90vh;
  border-radius: 2vh;
  padding: 1vh;
  display: flex;
  flex-direction: column;
  border: 0.3vh solid rgba(255, 255, 255, 0.1);
`
