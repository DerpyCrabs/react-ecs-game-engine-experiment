import React from 'react'
import { Entity } from '../engine'
import { UIProps } from '../types'

function countResources(entities: Entity<any>[]): { [item: string]: number } {
  const resources: any = {}
  entities.forEach(e => {
    const items = e.components.storage?.items
    if (
      items &&
      (e.components.producingOccupation || e.components.extractionOccupation)
    ) {
      Object.entries(items).forEach(([itemType, amount]) => {
        if (resources[itemType]) {
          resources[itemType] += amount
        } else {
          resources[itemType] = amount
        }
      })
    }
  })
  return resources
}

export default function ResourceSellWindow({
  state,
  entities,
  dispatch,
}: UIProps) {
  if (!state.uiState.sellWindowOpen) {
    return null
  }
  return (
    <div style={{ backgroundColor: 'lightblue' }}>
      {Object.entries(countResources(entities)).map(([item, amount]) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            {item}: {amount}
          </span>
          <button
            onClick={() =>
              dispatch({ action: 'SellResource', resource: item, amount: 10 })
            }
          >
            Sell 10
          </button>
        </div>
      ))}
    </div>
  )
}
