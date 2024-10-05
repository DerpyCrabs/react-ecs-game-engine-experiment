import { Entity } from '../engine'
import { EntityIdComponent, PositionComponent, SizeComponent, SpriteComponent } from '../components'
import { create } from 'mutative'
import { System } from '../types'

type BoostIndicationSystemQuery = {
  position: PositionComponent
  size: SizeComponent
  entityId: EntityIdComponent
  sprite: SpriteComponent
}

export function BoostIndicationSystem(): System<BoostIndicationSystemQuery> {
  return [
    'BoostIndicationSystem',
    ['position', 'size', 'entityId', 'sprite'],
    (entities, { state: { boostedEntity } }) => {
      return create(entities, (entities) => {
        entities.forEach((e) => {
          if (boostedEntity && e.components.entityId.id === boostedEntity) {
            e.components.sprite.border = 'solid 3px white'
          } else {
            e.components.sprite.border = undefined
          }
        })
      })
    },
  ]
}
