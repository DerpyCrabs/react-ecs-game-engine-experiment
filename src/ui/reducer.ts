import { GlobalState } from '../types'
import * as R from 'ramda'
import { Entity } from '../engine'
import { UIAction } from './actions'
import { produce } from 'immer'
import towerMap from '../maps/tower'
import {
  CarryingOccupationComponent,
  ExtractionOccupationComponent,
  LevelComponent,
  ProducingOccupationComponent,
} from '../components'

export default function reducer(
  s: GlobalState,
  es: Entity<any>[],
  a: UIAction
): [GlobalState, Entity<any>[]] {
  const stateL = R.lensProp<GlobalState, 'uiState'>('uiState')
  switch (a.action) {
    case 'ToggleWindow':
      return [
        R.set(R.compose(stateL, R.lensProp('openedWindow')), a.window, s),
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
      break
    }
    case 'UpgradeFacility': {
      return produce(([s, es]: [GlobalState, Entity<any>[]]) => {
        const entity = es.find(e => e.components?.entityId?.id === a.entityId)
        const entityLevelComponent = entity?.components?.level
        const entityUpgrades = towerMap.upgrades[a.entityId]
        if (
          entity &&
          entityUpgrades &&
          entityLevelComponent &&
          entityUpgrades.upgradeCost(entityLevelComponent.level + 1) <= s.gold
        ) {
          upgradeEntity(entity, entityUpgrades)
          s.gold -= entityUpgrades.upgradeCost(entityLevelComponent.level)
        }
      })([s, es])
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
        currentAmount += item
      }
    }
  }
  return null
}

function upgradeEntity(
  e: Entity<{
    level: LevelComponent
    producingOccupation?: ProducingOccupationComponent
    carryingOccupation?: CarryingOccupationComponent
    extractionOccupation?: ExtractionOccupationComponent
  }>,
  upgrades: typeof towerMap.upgrades[string]
): void {
  const nextLevel = e.components.level.level + 1
  if (e.components?.carryingOccupation) {
    e.components.carryingOccupation.speed = upgrades.speed(nextLevel)
    e.components.carryingOccupation.capacity =
      upgrades.capacity?.(nextLevel) || 0
  } else if (e.components?.producingOccupation) {
    e.components.producingOccupation.speed = upgrades.speed(nextLevel)
  } else if (e.components?.extractionOccupation) {
    e.components.extractionOccupation.speed = upgrades.speed(nextLevel)
  }
  e.components.level.level = nextLevel
}
