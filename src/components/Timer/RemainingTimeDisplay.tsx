import React from 'react'

function RemainingTimeDisplay ({ remainingTime } : { remainingTime : number}) {
  const pad = (n : number) => n.toString().padStart(2, '0')
  const formatTime = (seconds : number) : string => pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60)

  return (
    <div id='time-left'>{formatTime(remainingTime)}</div>
  )
}

export default RemainingTimeDisplay
