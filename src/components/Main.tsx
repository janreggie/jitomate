import React, { useState } from 'react'
import { DefaultBreakLength, DefaultSessionLength } from '../config'
import LengthControls from './LengthControls'
import Timer from './Timer'

function Main () {
  const [sessionLength, setSessionLength] = useState(DefaultSessionLength)
  const [breakLength, setBreakLength] = useState(DefaultBreakLength)

  return (
    <main className='border text-center'>
      <Timer
        sessionLength={sessionLength}
        breakLength={breakLength}
        resetLengths={() => { setSessionLength(DefaultSessionLength); setBreakLength(DefaultBreakLength) }}
        />
      <LengthControls
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        breakLength={breakLength}
        setBreakLength={setBreakLength} />
    </main>
  )
}

export default Main
