import React, { useEffect, useState } from 'react'
import audioElement from './audioElement'
import RemainingTimeDisplay from './RemainingTimeDisplay'
import TimerLabel from './TimerLabel'

export type timerParameters = {
  sessionLength: number
  breakLength: number
  resetLengths: (() => void)
}

function Timer (params : timerParameters) {
  const [remainingTime, setRemainingTime] = useState(params.sessionLength * 60) // remaining time that is visible
  const [hasStarted, setHasStarted] = useState(false) // has start been pressed once?
  const [isOnBreak, setIsOnBreak] = useState(false) // session or break mode?
  const [isRunning, setIsRunning] = useState(false) // is it not paused?

  /** atReset reverts the program to its "initial" state */
  const atReset = () => {
    setHasStarted(false)
    setIsRunning(false)
    setIsOnBreak(false)
    params.resetLengths()
    audioElement.pause()
    audioElement.currentTime = 0
  }

  /** atToggleStartStop runs when the start/stop button is pressed */
  const atToggleStartStop = () => {
    setHasStarted(true)
    setIsRunning(!isRunning)
  }

  // To make sure that remainingTime is "linked" to sessionLength until start button has been pressed
  useEffect(() => {
    if (hasStarted) { return }
    setRemainingTime(params.sessionLength * 60)
  }, [hasStarted, params.sessionLength])

  // To countdown remaining time
  useEffect(() => {
    if (!isRunning) { return }

    const intervalID = setTimeout(() => { setRemainingTime(remainingTime - 1) }, 1000)
    console.log(intervalID)
    return () => { clearTimeout(intervalID) } // if isRunning gets toggled, make sure to cancel it
  }, [remainingTime, isRunning])

  // To trigger at 00:00
  useEffect(() => {
    if (remainingTime > 0) { return }

    if (isOnBreak) {
      setRemainingTime(params.sessionLength * 60)
    } else {
      setRemainingTime(params.breakLength * 60)
    }
    setIsOnBreak(!isOnBreak)
    audioElement.play()
  }, [remainingTime])

  return (
    <div>
      <TimerLabel hasStarted={hasStarted} isRunning={isRunning} isOnBreak={isOnBreak} />
      <RemainingTimeDisplay remainingTime={remainingTime} />
      <button className='btn btn-primary' type='button' onClick={atToggleStartStop} id='start_stop'>{isRunning ? 'stop' : 'start'}</button>
      <button className='btn btn-primary' type='button' onClick={atReset} id='reset'>reset</button>
    </div>
  )
}

export default Timer
