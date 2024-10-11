import { GlobalState } from '../types'
import * as R from 'ramda'
import { Entity } from '../engine'
import { UIAction } from './actions'
import { create } from 'mutative'
import towerMap from '../maps/tower'
import {
  CarryingOccupationComponent,
  ExtractionOccupationComponent,
  LevelComponent,
  ProducingOccupationComponent,
} from '../components'
import { countResources, sellAmountVariantToMultiplier } from './utils'

export default function reducer(s: GlobalState, es: Entity<any>[], a: UIAction): [GlobalState, Entity<any>[]] {
  const stateL = R.lensProp<GlobalState, 'uiState'>('uiState')
  switch (a.action) {
    case 'ToggleSellWindow':
      return [R.over(R.compose(stateL, R.lensProp<GlobalState['uiState']>('isSellWindowOpen')), R.not, s), es]
    case 'ToggleUpgradeWindow':
      return [R.over(R.compose(stateL, R.lensProp<GlobalState['uiState']>('isUpgradeWindowOpen')), R.not, s), es]
    case 'SellResource': {
      const resourceAmount = Math.floor(countResources(es)[a.resource] * sellAmountVariantToMultiplier(a.amount))
      const entitiesToSell = getEntitiesToSellResource(es, a.resource, resourceAmount)
      if (entitiesToSell !== null) {
        const newEntities = create(es, (entities) => {
          entitiesToSell.forEach(([index, amount]) => {
            entities[index].components.storage.items[a.resource] -= amount
          })
        })
        return [
          {
            ...s,
            gold: s.gold + resourceAmount * towerMap.resources[a.resource].cost || 0,
          },
          newEntities,
        ]
      }
      break
    }
    case 'UpgradeFacility': {
      return create([s, es], ([s, es]) => {
        const entity = es.find((e) => e.components?.entityId?.id === a.entityId)
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
      })
    }
  }
  return [s, es]
}

function getEntitiesToSellResource(es: Entity<any>[], resource: string, amount: number): [number, number][] | null {
  const entitiesToSell: [number, number][] = []
  let currentAmount = 0
  for (const [i, e] of es.entries()) {
    const item = e.components?.storage?.items[resource]
    if (item && (e.components.producingOccupation || e.components.extractionOccupation)) {
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
  upgrades?: (typeof towerMap.upgrades)[string]
): void {
  if (!upgrades) return

  const nextLevel = e.components.level.level + 1
  if (e.components?.carryingOccupation) {
    e.components.carryingOccupation.speed = upgrades.speed?.(nextLevel) ?? e.components.carryingOccupation.speed
    e.components.carryingOccupation.capacity =
      upgrades.capacity?.(nextLevel) ?? e.components.carryingOccupation.capacity
  } else if (e.components?.producingOccupation) {
    e.components.producingOccupation.speed = upgrades.speed?.(nextLevel) ?? e.components.producingOccupation.speed
  } else if (e.components?.extractionOccupation) {
    e.components.extractionOccupation.speed = upgrades.speed?.(nextLevel) ?? e.components.extractionOccupation.speed
  }
  e.components.level.level = nextLevel
}
