export type ItemType = 'stone' | 'wood' | 'iron' | 'brick'

export type EntityId = string

export interface StorageComponent {
  items: {
    [key in ItemType]?: number
  }
}

export interface OccupationComponent {
  speed: number
  progress: number
}

export interface EntityIdComponent {
  id: EntityId
}

export interface CarryingOccupationComponent extends OccupationComponent {
  capacity: number
  sourceFacility: EntityId
  destinationFacility: EntityId
  itemType: ItemType
}

export interface ExtractionOccupationComponent extends OccupationComponent {
  itemType: ItemType
}

export interface ProducingOccupationComponent extends OccupationComponent {
  inputItemType: ItemType
  outputItemType: ItemType
}

export interface PositionComponent {
  x: number
  y: number
}

export interface SpriteComponent {
  color?: string
  spriteUrl?: string
  zIndex?: number
  border?: string
}

export interface SizeComponent {
  width: number
  height: number
}

export interface LevelComponent {
  level: number
}

export interface BuildingComponent {
  progress: number
  remainingCost: { [item: string]: number }
  totalCost: { [item: string]: number }
}
