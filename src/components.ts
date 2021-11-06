export type ItemType = 'ore' | 'brick'


export enum FacilityId {
  OreMine = 'OreMine',
  BrickFactory = 'BrickFactory',
}

export interface StorageComponent {
  items: {
    [key in ItemType]?: number
  }
}

export interface OccupationComponent {
  speed: number
  progress: number
}

export interface FacilityComponent {
  id: FacilityId
}

export interface CarryingOccupationComponent extends OccupationComponent {
  speed: number
  capacity: number
  sourceFacility: FacilityId
  destinationFacility: FacilityId
  itemType: ItemType
}

export interface ExtractionOccupationComponent extends OccupationComponent {
  speed: number
  itemType: ItemType
}

export interface ProducingOccupationComponent extends OccupationComponent {
  speed: number
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
}

export interface SizeComponent {
  width: number
  height: number
}
