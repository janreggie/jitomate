import React from 'react'

export type startResetButtonsParameters = {
  isRunning : boolean
  atToggleStartStop : (() => void)
  atReset : (() => void)
}

function StartResetButtons (params : startResetButtonsParameters) {
  return (
      <div className='row' id='start-reset-buttons'>
        <button className={'btn ' + (params.isRunning ? 'btn-outline-primary' : 'btn-primary') + ' m-2 col'}
            type='button'
            onClick={params.atToggleStartStop}
            id='start_stop'>
          {params.isRunning ? 'stop' : 'start'}
        </button>
        <button className='btn btn-danger m-2 col'
            type='button'
            onClick={params.atReset}
            id='reset'>
          reset
        </button>
      </div>
  )
}

export default StartResetButtons
