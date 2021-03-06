import React from 'react'

export type timerLabelParameters = {
  hasStarted : boolean
  isRunning : boolean
  isOnBreak : boolean
}

function TimerLabel (params : timerLabelParameters) {
  const labelText = () => {
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
    <div id='timer-label'>{ labelText() }</div>
  )
}

export default TimerLabel
