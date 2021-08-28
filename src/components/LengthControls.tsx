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
    <div className='row' id='length-controls'>
      <div className='col'>
        <Knob
          name='session'
          label='Session Length'
          value={params.sessionLength}
          setValue={params.setSessionLength}
          stepSize={1}
          maximum={60} />
      </div>
      <div className='col'>
        <Knob
          name='break'
          label='Break Length'
          value={params.breakLength}
          setValue={params.setBreakLength}
          stepSize={1}
          maximum={60} />
      </div>
    </div>
  )
}

export default LengthControls
