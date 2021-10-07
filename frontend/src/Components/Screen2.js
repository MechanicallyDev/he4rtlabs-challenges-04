import styled from 'styled-components'

export default function Screen2(props){
  return (
    <Screen2Styled>
      {props.children}
    </Screen2Styled>
  )
}

const Screen2Styled = styled.div`
  width: 100%;
  height: 100%;
  line-height: 1.4;
  position: relative;
`

