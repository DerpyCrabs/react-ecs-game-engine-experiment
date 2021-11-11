import {
  CarryingOccupationComponent,
  EntityIdComponent,
  StorageComponent,
} from '../components'
import { Entity, RSystem } from '../engine'
import { produce } from 'immer'

type CarryingSystemQuery = {
  storage: StorageComponent
  entityId: EntityIdComponent
}

export function CarryingSystem(): RSystem<CarryingSystemQuery> {
  return [
    'CarryingSystem',
    ['storage', 'entityId'],
    (entities, { frameRate, state: { boostedEntity } }) => {
      return produce(entities => {
        entities.forEach((e: Entity<CarryingSystemQuery | any>) => {
          if (e.components.carryingOccupation) {
            const occupation = e.components
              .carryingOccupation as CarryingOccupationComponent
            const sourceFacility = entities.find(
              (s: Entity<any>) =>
                s.components?.entityId?.id === occupation.sourceFacility
            ) as Entity<{ storage: StorageComponent }>
            const destinationFacility = entities.find(
              (s: Entity<any>) =>
                s.components?.entityId?.id === occupation.destinationFacility
            ) as Entity<{ storage: StorageComponent }>
            const items = e.components.storage.items
            const itemType = occupation.itemType
            const capacity = occupation.capacity
            const sourceItems = sourceFacility.components.storage.items
            const destinationItems =
              destinationFacility.components.storage.items
            const occupationSpeed =
              occupation.speed *
              (boostedEntity === e.components.entityId.id ? 3 : 1)

            if (
              occupation.progress === 0 &&
              (sourceItems[itemType] || 0) >= capacity
            ) {
              sourceItems[itemType] = (sourceItems[itemType] || 0) - capacity
              items[itemType] = capacity
              occupation.progress += occupationSpeed * (1 / frameRate)
            } else if (occupation.progress !== 0) {
              occupation.progress += occupationSpeed * (1 / frameRate)

              if (occupation.progress >= 0.5 && items[itemType] !== 0) {
                destinationItems[itemType] =
                  (destinationItems[itemType] || 0) + (items[itemType] || 0)
                items[itemType] = 0
              } else if (occupation.progress >= 1.0) {
                occupation.progress = 0
              }
            }
          }
        })
      })(entities)
    },
  ]
}
