import { EntityIdComponent, ExtractionOccupationComponent, StorageComponent } from '../components'
import { create } from 'mutative'
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
      return create(entities, (entities) => {
        entities.forEach((e) => {
          const occupation = e.components.extractionOccupation
          const items = e.components.storage.items
          const itemType = occupation.itemType
          const occupationSpeed = occupation.speed * (boostedEntity === e.components.entityId.id ? 3 : 1)

          occupation.progress += occupationSpeed * (1 / frameRate)

          if (occupation.progress >= 1.0) {
            occupation.progress = 0

            items[itemType] = (items[itemType] || 0) + 1
          }
        })
      })
    },
  ]
}
