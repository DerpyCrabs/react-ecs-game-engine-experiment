import React from 'react'
import { UIProps } from '../types'
import ResourceSellWindow from './ResourceSellWindow'
import UpgradeWindow from './UpgradeWindow'

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
          {state.uiState.openedWindow !== null ? (
            <button
              style={{ width: '160px' }}
              onClick={() => dispatch({ action: 'ToggleWindow', window: null })}
            >
              Close
            </button>
          ) : (
            <>
              <button
                style={{ width: '80px' }}
                onClick={() =>
                  dispatch({ action: 'ToggleWindow', window: 'sell' })
                }
              >
                Sell
              </button>
              <button
                style={{ width: '80px' }}
                onClick={() =>
                  dispatch({ action: 'ToggleWindow', window: 'upgrade' })
                }
              >
                Upgrade
              </button>
            </>
          )}
        </div>
        <ResourceSellWindow {...{ entities, state, dispatch }} />
        <UpgradeWindow {...{ entities, state, dispatch }} />
      </div>
    </div>
  )
}
