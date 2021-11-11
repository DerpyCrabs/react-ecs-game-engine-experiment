import { Entity, RSystem } from '../engine'
import {
  EntityIdComponent,
  PositionComponent,
  SizeComponent,
  SpriteComponent,
} from '../components'
import { produce } from 'immer'

type BoostIndicationSystemQuery = {
  position: PositionComponent
  size: SizeComponent
  entityId: EntityIdComponent
  sprite: SpriteComponent
}

export function BoostIndicationSystem(): RSystem<BoostIndicationSystemQuery> {
  return [
    'BoostIndicationSystem',
    ['position', 'size', 'entityId', 'sprite'],
    (entities, { input, state: { boostedEntity } }) => {
      return produce((entities: Entity<BoostIndicationSystemQuery>[]) => {
        entities.forEach(e => {
          if (boostedEntity && e.components.entityId.id === boostedEntity) {
            e.components.sprite.border = 'solid 3px white'
          } else {
            e.components.sprite.border = undefined
          }
        })
      })(entities)
    },
  ]
}
