import React from 'react'
import Knob from './Knob'

type lengthControlsParameters = {
  sessionLength: number
  setSessionLength: ((n : number) => void)
  breakLength: number
  setBreakLength: ((n : number) => void)
}

function LengthControls (params : lengthControlsParameters) {
  return (
    <div>
      <div className='p-2 bg-light border'>
        Session length:
        <Knob name='session' value={params.sessionLength} setValue={params.setSessionLength} stepSize={5} />
      </div>
      <div className='p-2 bg-light border'>
        Break length:
        <Knob name='break' value={params.breakLength} setValue={params.setBreakLength} stepSize={5} />
      </div>
    </div>
  )
}

export default LengthControls
