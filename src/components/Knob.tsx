import React from 'react'

export type knobParameters = {
  name: string
  label: string
  value: number
  setValue: ((n: number) => void)
  stepSize: number
  maximum: number
}

function Knob (params: knobParameters) {
  const increment = () => {
    if (params.value + params.stepSize > params.maximum) {
      return
    }
    params.setValue(params.value + params.stepSize)
  }
  const decrement = () => {
    if (params.value <= params.stepSize) {
      return
    }
    params.setValue(params.value - params.stepSize)
  }

  return (
    <div className='p-2 bg-light border knob'>
      <div id={params.name + '-label'}>{params.label}</div>
      <div className='btn-group' id={params.name + '-knob'}>
        <button className='btn btn-secondary' id={params.name + '-decrement'} type='button' onClick={decrement}>-</button>
        <button className='btn' id={params.name + '-length'} disabled={true}>{params.value}</button>
        <button className='btn btn-secondary' id={params.name + '-increment'} type='button' onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default Knob
