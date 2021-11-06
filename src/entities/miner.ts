import {
  ExtractionOccupationComponent,
  FacilityComponent,
  FacilityId,
  PositionComponent,
  SizeComponent,
  SpriteComponent,
  StorageComponent,
} from '../components'
import { Entity } from '../engine'

export const miner: Entity<{
  position: PositionComponent
  size: SizeComponent
  sprite: SpriteComponent
  extractionOccupation: ExtractionOccupationComponent
  storage: StorageComponent
  facility: FacilityComponent
}> = {
  components: {
    position: { x: 80, y: 30 },
    size: { width: 50, height: 50 },
    sprite: { color: 'red' },
    extractionOccupation: {
      speed: 0.5,
      progress: 0.0,
      itemType: 'ore',
    },
    facility: {
      id: FacilityId.OreMine,
    },
    storage: {
      items: {
        ore: 0,
      },
    },
  },
}
