import * as R from 'ramda'
import React from 'react'
import GameEngine, { System } from './GameEngine'

interface PositionComponent {
  x: number
  y: number
}

interface SpriteComponent {
  color: string
}

interface SizeComponent {
  width: number
  height: number
}

type RenderSystemQuery = {
  position: PositionComponent
  sprite: SpriteComponent
  size: SizeComponent
}

function DrawEntity({ entity }: { entity: RenderSystemQuery }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: entity.size.height,
        width: entity.size.width,
        left: entity.position.x,
        top: entity.position.y,
        backgroundColor: entity.sprite.color,
      }}
    ></div>
  )
}

function RenderSystem(): System<RenderSystemQuery> {
  return [
    'RenderSystem',
    ['position', 'sprite', 'size'],
    (entities) => {
      return {
        component: (
          <>
            {entities.map((e, i) => (
              <DrawEntity key={i} entity={e.components} />
            ))}
          </>
        ),
      }
    },
  ]
}

type MoveSystemQuery = {
  position: PositionComponent
}

function MoveSystem(): System<MoveSystemQuery> {
  return [
    'MoveSystem',
    ['position'],
    (entities) => {
      return {
        entities: R.map(
          R.over(R.lensPath(['components', 'position']), ({ x, y }) => ({
            x: x + 1,
            y: y + 1,
          })),
          entities
        ),
      }
    },
  ]
}

function PainterSystem(): System<{}> {
  return [
    'PainterSystem',
    [],
    (entities, { input }) => {
      const newEntities = (
        input.filter((i) => i.kind === 'mouseDown') as any as MouseEvent[]
      ).map((i) => ({
        components: {
          position: { x: i.x, y: i.y },
          sprite: { color: 'white' },
          size: { width: 5, height: 5 },
        },
      }))
      return {
        entities: [...entities, ...newEntities],
      }
    },
  ]
}

function CleanupSystem(): System<MoveSystemQuery> {
  return [
    'CleanupSystem',
    ['position'],
    (entities, { viewportWidth, viewportHeight }) => {
      return {
        entities: entities.filter(
          (e) =>
            e.components.position.x < viewportWidth &&
            e.components.position.y < viewportHeight
        ),
      }
    },
  ]
}

function LogASystem(): System<{}, { aCount: number }> {
  return [
    'LogASystem',
    [],
    (entities, { input, state }) => {
      if (input.length !== 0) {
        console.log(input)
      }

      const newAPresses = input.filter(
        (i) => i.kind === 'keyDown' && i.key === 'a'
      ).length
      if (state.aCount + newAPresses !== state.aCount) {
        console.log(state.aCount + newAPresses)
      }

      return {
        state: { aCount: state.aCount + newAPresses },
      }
    },
  ]
}

function App() {
  const dog = {
    components: {
      position: { x: 5, y: 10 },
      sprite: { color: 'red' },
      size: { width: 5, height: 5 },
    },
  }

  const text = {
    components: {
      position: { x: 5, y: 10 },
    },
  }

  const entities = [dog, text]

  return (
    <div>
      <GameEngine
        entities={entities}
        viewportWidth='30vw'
        viewportHeight='20vh'
        debug={true}
        systems={[
          PainterSystem(),
          MoveSystem(),
          CleanupSystem(),
          LogASystem(),
          RenderSystem(),
        ]}
        initialState={{ aCount: 0 }}
      />
    </div>
  )
}

export default App
