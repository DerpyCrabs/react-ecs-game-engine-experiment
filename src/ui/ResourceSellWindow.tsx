import React from 'react'
import { UIProps } from '../types'
import {
  countResources,
  sellAmountVariants,
  sellAmountVariantToMultiplier,
} from './utils'

export default function ResourceSellWindow({
  state,
  entities,
  dispatch,
}: UIProps) {
  if (!state.uiState.isSellWindowOpen) {
    return null
  }
  const [sellAmountVariantIndex, setSellAmountVariantIndex] = React.useState(0)

  return (
    <div
      style={{ backgroundColor: 'lightcyan', overflowY: 'auto', width: '35%' }}
    >
      <div style={{ display: 'flex', marginBottom: '5px' }}>
        {sellAmountVariants.map((v, i) => (
          <button
            style={{
              flexGrow: 1,
              backgroundColor:
                i === sellAmountVariantIndex ? 'lightgray' : undefined,
            }}
            key={i}
            onClick={() => setSellAmountVariantIndex(i)}
          >
            {v}
          </button>
        ))}
      </div>

      {Object.entries(countResources(entities)).map(([item, amount]) => (
        <div
          key={item}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>
            {item}: {amount}
          </span>
          <button
            onClick={() =>
              dispatch({
                action: 'SellResource',
                resource: item,
                amount: sellAmountVariants[sellAmountVariantIndex],
              })
            }
          >
            Sell{' '}
            {Math.floor(
              amount *
                sellAmountVariantToMultiplier(
                  sellAmountVariants[sellAmountVariantIndex]
                )
            )}
          </button>
        </div>
      ))}
    </div>
  )
}
