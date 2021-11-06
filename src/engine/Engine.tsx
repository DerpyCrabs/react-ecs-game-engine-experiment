import * as React from 'react'
import useDimensions from 'react-cool-dimensions'
import { Entity, System, Event } from './types'
import useInterval from './use-interval'
import applySystems, { entityPassesQuery } from './apply-systems'
import Viewport from './Viewport'

export default function GameEngine({
  entities,
  systems,
  viewportHeight,
  viewportWidth,
  debug = false,
  initialState = {},
  frameRate = 30,
}: {
  entities: Entity<any>[]
  systems: System<any>[]
  viewportHeight: string | number
  viewportWidth: string | number
  debug?: boolean
  initialState?: any
  frameRate?: number
}) {
  const [currentFrameRate, setCurrentFrameRate] = React.useState(frameRate)
  const [currentData, setData] = React.useState({
    entities,
    components: [] as React.ReactNode[],
    state: initialState,
    lastFrameTimestamp: new Date().getTime(),
    frameRate: frameRate,
  })

  const [paused, setPaused] = React.useState(false)
  const eventsRef = React.useRef([] as Event[])

  const {
    observe: viewportRef,
    height: currentViewportHeight,
    width: currentViewportWidth,
  } = useDimensions()

  const step = () => {
    setData(
      applySystems(currentData.entities, systems, {
        viewportHeight: currentViewportHeight,
        viewportWidth: currentViewportWidth,
        input: eventsRef.current,
        state: currentData.state,
        lastFrameTimestamp: currentData.lastFrameTimestamp,
        frameRate: currentData.frameRate,
        allEntities: currentData.entities,
      })
    )
    eventsRef.current = []
  }

  useInterval(step, paused ? null : 1000 / currentFrameRate)

  const ViewportElement = (
    <Viewport
      components={currentData.components}
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
      eventsRef={eventsRef}
      viewportRef={viewportRef}
    />
  )

  if (!debug) {
    return ViewportElement
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPaused((p) => !p)}>
            {paused ? 'Unpause' : 'Pause'}
          </button>
          <button onClick={() => step()}>Step</button>
          <span style={{ marginLeft: 20 }}>
            Framerate:{' '}
            <input
              type='range'
              step='5'
              value={currentFrameRate}
              min={5}
              max={60}
              onChange={(e) => setCurrentFrameRate(Number(e.target.value))}
            />
            {currentFrameRate}
          </span>
        </div>
        <h1>Viewport</h1>
        {ViewportElement}
        <h1>Systems</h1>
        {systems.map((system, i) => (
          <div key={i}>
            {JSON.stringify(system[0])}: {JSON.stringify(system[1])}
          </div>
        ))}
        <h1>State</h1>
        {JSON.stringify(currentData.state)}
        <h1>Entities</h1>
        {currentData.entities.map((entity, i) => (
          <div key={i}>
            {i}: {JSON.stringify(entity)}, applicableSystems:{' '}
            {JSON.stringify(
              systems
                .map((s) =>
                  entityPassesQuery(entity, s[1]) ? s[0] : undefined
                )
                .filter((s) => s !== undefined)
            )}
          </div>
        ))}
      </div>
    )
  }
}
