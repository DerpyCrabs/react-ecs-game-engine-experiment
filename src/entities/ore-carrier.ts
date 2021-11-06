import {
  CarryingOccupationComponent,
  FacilityId,
  PositionComponent,
  SizeComponent,
  SpriteComponent,
  StorageComponent,
} from '../components'
import { Entity } from '../engine'

export const oreCarrier: Entity<{
  position: PositionComponent
  size: SizeComponent
  sprite: SpriteComponent
  carryingOccupation: CarryingOccupationComponent
  storage: StorageComponent
}> = {
  components: {
    position: { x: 80, y: 30 },
    size: { width: 20, height: 20 },
    sprite: { color: 'blue', zIndex: 10 },
    carryingOccupation: {
      speed: 0.4,
      capacity: 3,
      itemType: 'ore',
      progress: 0.0,
      sourceFacility: FacilityId.OreMine,
      destinationFacility: FacilityId.BrickFactory,
    },
    storage: {
      items: {
        ore: 0,
      },
    },
  },
}
