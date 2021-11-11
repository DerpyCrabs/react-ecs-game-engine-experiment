import {
  EntityIdComponent,
  ExtractionOccupationComponent,
  StorageComponent,
} from '../components'
import { Entity } from '../engine'
import { produce } from 'immer'
import { System } from '../types'

type MiningSystemQuery = {
  extractionOccupation: ExtractionOccupationComponent
  storage: StorageComponent
  entityId: EntityIdComponent
}

export function MiningSystem(): System<MiningSystemQuery> {
  return [
    'MiningSystem',
    ['extractionOccupation', 'storage', 'entityId'],
    (entities, { frameRate, state: { boostedEntity } }) => {
      return produce(entities => {
        entities.forEach((e: Entity<MiningSystemQuery>) => {
          const occupation = e.components.extractionOccupation
          const items = e.components.storage.items
          const itemType = occupation.itemType
          const occupationSpeed =
            occupation.speed *
            (boostedEntity === e.components.entityId.id ? 3 : 1)

          occupation.progress += occupationSpeed * (1 / frameRate)

          if (occupation.progress >= 1.0) {
            occupation.progress = 0

            items[itemType] = (items[itemType] || 0) + 1
          }
        })
      })(entities)
    },
  ]
}
