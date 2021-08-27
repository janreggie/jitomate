import React, { useEffect, useState } from 'react'
import { DefaultSessionLength } from '../config'

// For audio (see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API).
// @ts-ignore webkitAudioContext may exist in other browsers
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext()
const audioElement = document.querySelector('audio')! // Exclamation pt b/c YES, IT EXISTS! Check /index.html
const track = audioContext.createMediaElementSource(audioElement)
track.connect(audioContext.destination)

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

  /** atReset reverts the program to its "initial" state */
  const atReset = () => {
    setHasStarted(false)
    setIsRunning(false)
    setIsOnBreak(false)
    params.resetLengths()
    audioElement.pause()
    audioElement.currentTime = 0
    setRemainingTime(DefaultSessionLength * 60)
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
    return () => { clearTimeout(intervalID) }
  }, [remainingTime, isRunning])

  // To trigger at 00:00
  useEffect(() => {
    if (remainingTime !== 0) { return }

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
