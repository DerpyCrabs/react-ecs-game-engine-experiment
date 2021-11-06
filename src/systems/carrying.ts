import { CarryingOccupationComponent, StorageComponent } from '../components'
import { Entity, System } from '../engine'
import { produce } from 'immer'

type CarryingSystemQuery = {
  storage: StorageComponent
}

export function CarryingSystem(): System<CarryingSystemQuery> {
  return [
    'CarryingSystem',
    ['storage'],
    (entities, { frameRate }) => {
      return produce((entities) => {
        entities.forEach((e: Entity<CarryingSystemQuery | any>) => {
          if (e.components.carryingOccupation) {
            const occupation = e.components
              .carryingOccupation as CarryingOccupationComponent
            const sourceFacility = entities.find(
              (s: Entity<any>) =>
                s.components?.facility?.id === occupation.sourceFacility
            ) as Entity<{ storage: StorageComponent }>
            const destinationFacility = entities.find(
              (s: Entity<any>) =>
                s.components?.facility?.id === occupation.destinationFacility
            ) as Entity<{ storage: StorageComponent }>
            const items = e.components.storage.items
            const itemType = occupation.itemType
            const capacity = occupation.capacity
            const sourceItems = sourceFacility.components.storage.items
            const destinationItems =
              destinationFacility.components.storage.items

            if (
              occupation.progress === 0 &&
              (sourceItems[itemType] || 0) >= capacity
            ) {
              sourceItems[itemType] = (sourceItems[itemType] || 0) - capacity
              items[itemType] = capacity
              occupation.progress += occupation.speed * (1 / frameRate)
            } else if (occupation.progress !== 0) {
              occupation.progress += occupation.speed * (1 / frameRate)

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
