import { GlobalState } from '../types'
import * as R from 'ramda'
import { Entity } from '../engine'
import { UIAction } from './actions'
import { produce } from 'immer'
import towerMap from '../maps/tower'

export default function reducer(
  s: GlobalState,
  es: Entity<any>[],
  a: UIAction
): [GlobalState, Entity<any>[]] {
  const stateL = R.lensProp<GlobalState, 'uiState'>('uiState')
  switch (a.action) {
    case 'ToggleResourceSellWindow':
      return [
        R.over(R.compose(stateL, R.lensProp('sellWindowOpen')), R.not, s),
        es,
      ]
    case 'SellResource': {
      const entitiesToSell = getEntitiesToSellResource(es, a.resource, a.amount)
      if (entitiesToSell !== null) {
        const newEntities = produce(entities => {
          entitiesToSell.forEach(([index, amount]) => {
            entities[index].components.storage.items[a.resource] -= amount
          })
        })(es)
        return [
          {
            ...s,
            gold: s.gold + a.amount * towerMap.resources[a.resource].cost || 0,
          },
          newEntities,
        ]
      }
    }
  }
  return [s, es]
}

function getEntitiesToSellResource(
  es: Entity<any>[],
  resource: string,
  amount: number
): [number, number][] | null {
  const entitiesToSell: [number, number][] = []
  let currentAmount = 0
  for (const [i, e] of es.entries()) {
    const item = e.components?.storage?.items[resource]
    if (
      item &&
      (e.components.producingOccupation || e.components.extractionOccupation)
    ) {
      if (item >= amount) {
        return [[i, amount]]
      } else if (item + currentAmount >= amount) {
        return [...entitiesToSell, [i, item]]
      } else {
        entitiesToSell.push([i, item])
      }
    }
  }
  return null
}
