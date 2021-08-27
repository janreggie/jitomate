import React, { useEffect, useState } from 'react'
import { DefaultSessionLength } from '../config'

type timerParameters = {
  sessionLength: number
  breakLength: number
  resetLengths: (() => void)
}

function Timer (params : timerParameters) {
  const [remainingTime, setRemainingTime] = useState(params.sessionLength * 60) // remaining time that is visible
  const [hasStarted, setHasStarted] = useState(false) // has start been pressed once?
  const [isOnBreak, setIsOnBreak] = useState(false) // session or break mode?
  const [isRunning, setIsRunning] = useState(false) // is it not paused?

  /** resetEverything reverts the program to its "initial" state */
  const resetEverything = () => {
    setHasStarted(false)
    setIsRunning(false)
    params.resetLengths()
    setRemainingTime(DefaultSessionLength * 60)
  }

  /** toggleStartStop runs when the start/stop button is pressed */
  const toggleStartStop = () => {
    setHasStarted(true)
    setIsRunning(!isRunning)
  }

  /** atTimerReset runs when remainingTime becomes zero */
  const atTimerReset = () => {
    if (isOnBreak) {
      setRemainingTime(params.sessionLength * 60)
    } else {
      setRemainingTime(params.breakLength * 60)
    }
    setIsOnBreak(!isOnBreak)
  }

  // To make sure that remainingTime is "linked" to sessionLength until start button has been pressed
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (hasStarted) { return }
      setRemainingTime(params.sessionLength * 60)
    }, 10)

    return () => { clearInterval(intervalID) }
  })

  // To countdown remaining time
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (!isRunning) { return }

      setRemainingTime(remainingTime - 1)
      if (remainingTime === 0) { atTimerReset() }

      if (remainingTime % 50 === 0) {
        console.log('Remaining time is ', remainingTime, ' on break? ', isOnBreak)
      }
    }, 1000)

    return () => {
      clearInterval(intervalID)
    }
  }, [remainingTime, isOnBreak, isRunning])

  return (
    <div>
      <TimerLabel hasStarted={hasStarted} isRunning={isRunning} isOnBreak={isOnBreak} />
      <RemainingTimeDisplay remainingTime={remainingTime} />
      <button className='btn btn-primary' type='button' onClick={toggleStartStop} id='start_stop'>{isRunning ? 'stop' : 'start'}</button>
      <button className='btn btn-primary' type='button' onClick={resetEverything} id='reset'>reset</button>
    </div>
  )
}

type timerLabelParameters = {
  hasStarted : boolean
  isRunning : boolean
  isOnBreak : boolean
}

function TimerLabel (params : timerLabelParameters) {
  const result = () => {
    if (!params.hasStarted) {
      return 'press start to start timer'
    }
    if (!params.isRunning) {
      return 'press start to continue timer'
    }
    if (params.isOnBreak) {
      return 'break started'
    }
    return 'session started'
  }

  return (
    <div id='timer-label'>{ result() }</div>
  )
}

function RemainingTimeDisplay ({ remainingTime } : { remainingTime : number}) {
  const pad = (n : number) => n.toString().padStart(2, '0')
  const formatTime = (seconds : number) : string => pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60)

  return (
    <div id='time-left' className='display-4'>{formatTime(remainingTime)}</div>
  )
}

export default Timer
