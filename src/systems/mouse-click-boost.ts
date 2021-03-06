import { MouseDownEvent } from '../engine'
import {
  EntityIdComponent,
  PositionComponent,
  SizeComponent,
  SpriteComponent,
} from '../components'
import * as R from 'ramda'
import { System } from '../types'

type MouseClickBoostSystemQuery = {
  position: PositionComponent
  size: SizeComponent
  entityId: EntityIdComponent
  sprite: SpriteComponent
}

export function MouseClickBoostSystem(
  screenWidth: number,
  screenHeight: number
): System<MouseClickBoostSystemQuery> {
  return [
    'MouseClickBoostSystem',
    ['position', 'size', 'entityId', 'sprite'],
    (
      entities,
      { input, state, viewportHeight, viewportWidth }
    ) => {
      const mouseClickEvents = input
        .filter(i => i.kind === 'mouseDown')
        .reverse() as MouseDownEvent[]
      const boostedEntityId = (() => {
        for (const e of R.sortBy(
          e => -(e.components.sprite.zIndex || 0),
          entities
        )) {
          for (const event of mouseClickEvents) {
            const eventX = (event.x / viewportWidth) * screenWidth
            const eventY = (event.y / viewportHeight) * screenHeight
            if (
              eventX >= e.components.position.x &&
              eventX <= e.components.position.x + e.components.size.width &&
              eventY >= e.components.position.y &&
              eventY <= e.components.position.y + e.components.size.height
            ) {
              return e.components.entityId.id
            }
          }
        }
      })()

      return {
        entities,
        state: { ...state, boostedEntity: boostedEntityId || state.boostedEntity },
      }
    },
  ]
}
