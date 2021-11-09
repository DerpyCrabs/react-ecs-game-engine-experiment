import { CarryingOccupationComponent, PositionComponent } from '../components'
import { Entity, System } from '../engine'
import { produce } from 'immer'
import towerMap from '../maps/tower'

type CarryingAnimationSystemQuery = {
  position: PositionComponent
  carryingOccupation: CarryingOccupationComponent
}

export function CarryingAnimationSystem(): System<CarryingAnimationSystemQuery> {
  return [
    'CarryingAnimationSystem',
    ['position', 'carryingOccupation'],
    (entities) => {
      return produce((entities) => {
        entities.forEach((e: Entity<CarryingAnimationSystemQuery>) => {
          const pos = e.components.position
          const sourcePos =
            towerMap[e.components.carryingOccupation.sourceFacility].position
          const destinationPos =
            towerMap[e.components.carryingOccupation.destinationFacility]
              .position

          pos.x =
            sourcePos.x +
            (destinationPos.x - sourcePos.x) *
              2 *
              (0.5 - Math.abs(e.components.carryingOccupation.progress - 0.5))

          pos.y =
            sourcePos.y +
            (destinationPos.y - sourcePos.y) *
              2 *
              (0.5 - Math.abs(e.components.carryingOccupation.progress - 0.5))
        })
      })(entities)
    },
  ]
}
