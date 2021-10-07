import Device from './Device'
import Screen1 from './Screen1'
import Screen2 from './Screen2'

export default function TwoScreenController({ screen1, screen2, children }) {
  return (
    <>
      <Device>
        <Screen1>
          {screen1 && children && children.filter(child => child.type.name === screen1)}
        </Screen1>
      </Device>
      <Device>
        <div className='hinge1' />
        <div className='hinge2' />
        <Screen2>
          {screen2 && children && children.filter(child => child.type.name === screen2)}
        </Screen2>
      </Device>
    </>
  )
}
