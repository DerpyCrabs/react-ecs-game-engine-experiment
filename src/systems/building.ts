import { create } from 'mutative'
import { BuildingComponent, EntityIdComponent, StorageComponent, ItemType } from '../components'
import { System } from '../engine'

type BuildingSystemQuery = {
  building: BuildingComponent
  storage: StorageComponent
  entityId: EntityIdComponent
}

export function BuildingSystem(): System<BuildingSystemQuery> {
  return [
    'BuildingSystem',
    ['building', 'storage', 'entityId'],
    (entities) => {
      return create(entities, (entities) => {
        for (const e of entities) {
          if (e.components.building && e.components.storage) {
            const { building, storage } = e.components

            // Calculate total remaining cost
            const totalRemainingCost = Object.values(building.remainingCost).reduce((sum, cost) => sum + cost, 0)

            if (totalRemainingCost > 0) {
              // Consume resources and update progress
              for (const [itemType, cost] of Object.entries(building.remainingCost) as [ItemType, number][]) {
                const availableResource = storage.items[itemType] || 0
                const consumedResource = Math.min(availableResource, cost)

                if (consumedResource > 0) {
                  // Update storage
                  storage.items[itemType] = availableResource - consumedResource

                  // Update remaining cost
                  building.remainingCost[itemType] -= consumedResource

                  // Update progress
                  const totalCost = Object.values(building.totalCost).reduce((sum, cost) => sum + cost, 0)
                  const consumedCost =
                    Object.values(building.totalCost).reduce((sum, cost) => sum + cost, 0) -
                    totalRemainingCost +
                    consumedResource
                  building.progress = consumedCost / totalCost
                }
              }
            }

            // Ensure progress is between 0 and 1
            building.progress = Math.max(0, Math.min(1, building.progress))
          }
        }
      })
    },
  ]
}
