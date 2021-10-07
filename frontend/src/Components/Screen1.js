import styled from 'styled-components'

export default function Screen1(props) {
  return (
    <Screen1Styled>
      {props.children}
    </Screen1Styled>
  )
}

const Screen1Styled = styled.div`
  width: 100%;
  height: 100%;
  line-height: 1.4;
  position: relative;
`

