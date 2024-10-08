import { SizeComponent, PositionComponent, SpriteComponent } from '../components'
import { System } from '../types'

type RenderSystemQuery = {
  position: PositionComponent
  sprite: SpriteComponent
  size: SizeComponent
}

function DrawEntity({
  entity,
  xCoefficient,
  yCoefficient,
}: {
  entity: RenderSystemQuery
  xCoefficient: number
  yCoefficient: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        height: entity.size.height * yCoefficient,
        width: entity.size.width * xCoefficient,
        left: entity.position.x * xCoefficient,
        top: entity.position.y * yCoefficient,
        backgroundColor: entity.sprite.color,
        zIndex: entity.sprite.zIndex || 0,
        pointerEvents: 'none',
        ...(entity.sprite.border ? { border: entity.sprite.border } : {}),
        ...(entity.sprite.spriteUrl ? { backgroundImage: entity.sprite.spriteUrl } : {}),
      }}
    ></div>
  )
}

export function RenderSystem(width: number, height: number): System<RenderSystemQuery> {
  return [
    'RenderSystem',
    ['position', 'sprite', 'size'],
    (entities, { viewportHeight, viewportWidth, state }) => {
      return {
        state: {
          ...state,
          components: entities.map((e, i) => (
            <DrawEntity
              key={i}
              entity={e.components}
              xCoefficient={viewportWidth / width}
              yCoefficient={viewportHeight / height}
            />
          )),
        },
      }
    },
  ]
}
