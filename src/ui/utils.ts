import { Entity } from '../engine'

export function countResources(entities: Entity<any>[]): {
  [item: string]: number
} {
  const resources: any = {}
  entities.forEach(e => {
    const items = e.components.storage?.items
    if (
      items &&
      (e.components.producingOccupation || e.components.extractionOccupation)
    ) {
      Object.entries(items).forEach(([itemType, amount]) => {
        if (resources[itemType]) {
          resources[itemType] += amount
        } else {
          resources[itemType] = amount
        }
      })
    }
  })
  return resources
}

export const sellAmountVariants = ['25%', '50%', '75%', '100%'] as const
export type SellAmount = typeof sellAmountVariants[number]
export const sellAmountVariantToMultiplier = (s: SellAmount): number => {
  switch (s) {
    case '25%':
      return 0.25
    case '50%':
      return 0.5
    case '75%':
      return 0.75
    case '100%':
      return 1.0
  }
}
