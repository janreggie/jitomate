import React from 'react'

type knobParameters = {
  name: string
  value: number
  setValue: ((n: number) => void)
  stepSize: number
}

function Knob (params: knobParameters) {
  const increment = () => {
    params.setValue(params.value + params.stepSize)
  }
  const decrement = () => {
    if (params.value <= params.stepSize) {
      return
    }
    params.setValue(params.value - params.stepSize)
  }

  return (
    <div className='btn-group' id={params.name + '-knob'}>
      <button className='btn btn-secondary' id={params.name + '-decrement'} type='button' onClick={decrement}>-</button>
      <div className='btn' id={params.name + '-length'}>{params.value}</div>
      <button className='btn btn-secondary' id={params.name + '-increment'} type='button' onClick={increment}>+</button>
    </div>
  )
}

export default Knob
