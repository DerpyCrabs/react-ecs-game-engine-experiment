import { Entity, MouseDownEvent, RSystem } from '../engine'
import {
  EntityIdComponent,
  PositionComponent,
  SizeComponent,
  SpriteComponent,
} from '../components'
import * as R from 'ramda'
import { State } from '@pixi/core'

type MouseClickBoostSystemQuery = {
  position: PositionComponent
  size: SizeComponent
  entityId: EntityIdComponent
  sprite: SpriteComponent
}

export function MouseClickBoostSystem(
  screenWidth: number,
  screenHeight: number
): RSystem<MouseClickBoostSystemQuery> {
  return [
    'MouseClickBoostSystem',
    ['position', 'size', 'entityId', 'sprite'],
    (
      entities,
      { input, state: { boostedEntity }, viewportHeight, viewportWidth }
    ) => {
      const mouseClickEvents = input
        .filter((i) => i.kind === 'mouseDown')
        .reverse() as MouseDownEvent[]
      const boostedEntityId = (() => {
        for (const e of R.sortBy(
          (e) => -(e.components.sprite.zIndex || 0),
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
        state: { ...State, boostedEntity: boostedEntityId || boostedEntity },
      }
    },
  ]
}
