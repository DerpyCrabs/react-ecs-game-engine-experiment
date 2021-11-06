import {
  ProducingOccupationComponent,
  PositionComponent,
  SizeComponent,
  SpriteComponent,
  StorageComponent,
  FacilityComponent,
  FacilityId,
} from '../components'
import { Entity } from '../engine'

export const brickMaker: Entity<{
  position: PositionComponent
  size: SizeComponent
  sprite: SpriteComponent
  producingOccupation: ProducingOccupationComponent
  storage: StorageComponent
  facility: FacilityComponent
}> = {
  components: {
    position: { x: 120, y: 100 },
    size: { width: 50, height: 50 },
    sprite: { color: 'lightblue' },
    producingOccupation: {
      speed: 0.5,
      inputItemType: 'ore',
      outputItemType: 'brick',
      progress: 0.0,
    },
    facility: {
      id: FacilityId.BrickFactory
    },
    storage: {
      items: {
        ore: 0,
        brick: 0,
      },
    },
  },
}
