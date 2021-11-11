import {
  EntityIdComponent,
  ProducingOccupationComponent,
  StorageComponent,
} from '../components'
import { Entity } from '../engine'
import { produce } from 'immer'
import { System } from '../types'

type ProducingSystemQuery = {
  producingOccupation: ProducingOccupationComponent
  storage: StorageComponent
  entityId: EntityIdComponent
}

export function ProducingSystem(): System<ProducingSystemQuery> {
  return [
    'ProducingSystem',
    ['producingOccupation', 'storage', 'entityId'],
    (entities, { frameRate, state: { boostedEntity } }) => {
      return produce(entities => {
        entities.forEach((e: Entity<ProducingSystemQuery>) => {
          const occupation = e.components.producingOccupation
          const items = e.components.storage.items
          const inputItemType = occupation.inputItemType
          const outputItemType = occupation.outputItemType
          const occupationSpeed =
            occupation.speed *
            (boostedEntity === e.components.entityId.id ? 3 : 1)

          if (occupation.progress === 0 && items[inputItemType] !== 0) {
            items[inputItemType] = (items[inputItemType] || 0) - 1
            occupation.progress += occupationSpeed * (1 / frameRate)
          } else if (occupation.progress !== 0) {
            occupation.progress += occupationSpeed * (1 / frameRate)

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
