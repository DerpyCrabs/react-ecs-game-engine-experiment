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
}: {
  entities: Entity<any>[]
  systems: System<any>[]
  viewportHeight: string | number
  viewportWidth: string | number
  debug?: boolean
  initialState?: any
}) {
  const [currentData, setData] = React.useState({
    entities,
    components: [] as React.ReactNode[],
    state: initialState,
    lastFrameTimestamp: new Date().getTime(),
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
      })
    )
    eventsRef.current = []
  }

  useInterval(step, paused ? null : 1000 / 30)

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
        <button onClick={() => setPaused((p) => !p)}>
          {paused ? 'Unpause' : 'Pause'}
        </button>
        <button onClick={() => step()}>Step</button>
        <h1>Viewport</h1>
        {ViewportElement}
        <h1>Systems</h1>
        {systems.map((system, i) => (
          <div key={i}>
            {JSON.stringify(system[0])}: {JSON.stringify(system[1])}
          </div>
        ))}
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
