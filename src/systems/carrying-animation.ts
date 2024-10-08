import { CarryingOccupationComponent, PositionComponent } from '../components'
import { create } from 'mutative'
import towerMap from '../maps/tower'
import { System } from '../types'

type CarryingAnimationSystemQuery = {
  position: PositionComponent
  carryingOccupation: CarryingOccupationComponent
}

export function CarryingAnimationSystem(): System<CarryingAnimationSystemQuery> {
  return [
    'CarryingAnimationSystem',
    ['position', 'carryingOccupation'],
    (entities) => {
      return create(entities, (entities) => {
        entities.forEach((e) => {
          const pos = e.components.position
          const sourcePos = towerMap.entities[e.components.carryingOccupation.sourceFacility].position
          const destinationPos = towerMap.entities[e.components.carryingOccupation.destinationFacility].position

          pos.x =
            sourcePos.x +
            (destinationPos.x - sourcePos.x) * 2 * (0.5 - Math.abs(e.components.carryingOccupation.progress - 0.5))

          pos.y =
            sourcePos.y +
            (destinationPos.y - sourcePos.y) * 2 * (0.5 - Math.abs(e.components.carryingOccupation.progress - 0.5))
        })
      })
    },
  ]
}
