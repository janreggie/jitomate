import React, { useState } from 'react'
import LengthControls from './LengthControls'

function Main () {
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)

  return (
    <div>
      <LengthControls
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        breakLength={breakLength}
        setBreakLength={setBreakLength} />
    </div>
  )
}

export default Main
