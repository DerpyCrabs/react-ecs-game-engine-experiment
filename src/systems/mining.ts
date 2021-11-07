import { ExtractionOccupationComponent, StorageComponent } from '../components'
import { Entity, RSystem } from '../engine'
import { produce } from 'immer'

type MiningSystemQuery = {
  extractionOccupation: ExtractionOccupationComponent
  storage: StorageComponent
}

export function MiningSystem(): RSystem<MiningSystemQuery> {
  return [
    'MiningSystem',
    ['extractionOccupation', 'storage'],
    (entities, { frameRate }) => {
      return produce((entities) => {
        entities.forEach((e: Entity<MiningSystemQuery>) => {
          const occupation = e.components.extractionOccupation
          const items = e.components.storage.items
          const itemType = occupation.itemType

          occupation.progress += occupation.speed * (1 / frameRate)

          if (occupation.progress >= 1.0) {
            occupation.progress = 0

            items[itemType] = (items[itemType] || 0) + 1
          }
        })
      })(entities)
    },
  ]
}
