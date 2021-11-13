import React from 'react'
import { UIProps } from '../types'
import ResourceSellWindow from './ResourceSellWindow'

export default function Panel({ entities, state, dispatch }: UIProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <div>
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <span style={{ paddingRight: 5 }}>Gold: {state.gold}</span>
          <button
            style={{ width: '140px' }}
            onClick={() => dispatch({ action: 'ToggleResourceSellWindow' })}
          >
            {state.uiState.sellWindowOpen ? 'Close window' : 'Open sell window'}
          </button>
        </div>
        <ResourceSellWindow {...{ entities, state, dispatch }} />
      </div>
    </div>
  )
}
