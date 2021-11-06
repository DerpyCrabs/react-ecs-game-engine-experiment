import { ProducingOccupationComponent, StorageComponent } from '../components'
import { Entity, System } from '../engine'
import { produce } from 'immer'

type ProducingSystemQuery = {
  producingOccupation: ProducingOccupationComponent
  storage: StorageComponent
}

export function ProducingSystem(): System<ProducingSystemQuery> {
  return [
    'ProducingSystem',
    ['producingOccupation', 'storage'],
    (entities, { frameRate }) => {
      return produce((entities) => {
        entities.forEach((e: Entity<ProducingSystemQuery>) => {
          const occupation = e.components.producingOccupation
          const items = e.components.storage.items
          const inputItemType = occupation.inputItemType
          const outputItemType = occupation.outputItemType

          if (occupation.progress === 0 && items[inputItemType] !== 0) {
            items[inputItemType] = (items[inputItemType] || 0) - 1
            occupation.progress += occupation.speed * (1 / frameRate)
          } else if (occupation.progress !== 0) {
            occupation.progress += occupation.speed * (1 / frameRate)

            if (occupation.progress >= 1.0) {
              occupation.progress = 0
              items[outputItemType] = (items[outputItemType] || 0) + 1
            }
          }
        })
      })(entities)
    },
  ]
}
