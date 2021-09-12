import styled from 'styled-components'

export default function Screen(props) {
  const { brightness = 50, children } = props
  const brightnessClamp = Math.min(Math.max(brightness,7),100)
  const howBright = Math.round(brightnessClamp * (255 / 100))
  const brightnessHEX = howBright.toString(16)
  const brightnessLerp = Math.round(80 - 60 * (brightnessClamp / 100))

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
  margin: 1vh auto;
  width: 95%;
  height: 95%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #628831 0%,
    #7e914a var(--brightness),
    #8c9d47 100%
  );
  border: 4px solid #9e3838;
  border-bottom: 0;
  border-right: 0;
  border-radius: 1vh;
  padding: 2vh;
  color: #22222288;
  font-size: 2vh;
  line-height: 1.6vh;
  font-weight: 700;
  overflow: hidden;
  box-shadow: inset -20px 0px 200px var(--color-brightness-hover),
    0px 0px 30px var(--color-brightness-hover), inset 2px 2px 8px #000000aa;
`
