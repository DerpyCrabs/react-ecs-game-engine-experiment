import * as React from 'react'
import useDimensions from 'react-cool-dimensions'
import {
  Entity,
  System,
  Event,
  DebugComponentProps,
  ReactAdditionalGlobals,
} from './types'
import useInterval from './use-interval'
import applySystems from './apply-systems'
import Viewport from './Viewport'
import FrameRateControls from './FrameRateControls'
import DefaultDebugView from './DefaultDebugView'

export default function GameEngine({
  entities,
  systems,
  viewportHeight,
  viewportWidth,
  debug = false,
  DebugComponent = DefaultDebugView,
  initialState = {},
  frameRate = 30,
  showFrameRateControls = false,
}: {
  entities: Entity<any>[]
  systems: System<any, any, ReactAdditionalGlobals>[]
  viewportHeight: string | number
  viewportWidth: string | number
  debug?: boolean
  initialState?: any
  frameRate?: number
  showFrameRateControls?: boolean
  DebugComponent?: (p: DebugComponentProps) => JSX.Element
}) {
  const [currentFrameRate, setCurrentFrameRate] = React.useState(frameRate)
  const [currentData, setData] = React.useState({
    entities,
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
      applySystems<any, ReactAdditionalGlobals>(currentData.entities, systems, {
        viewportHeight: currentViewportHeight,
        viewportWidth: currentViewportWidth,
        input: eventsRef.current,
        state: currentData.state,
        lastFrameTimestamp: currentData.lastFrameTimestamp,
        frameRate:
          1000 / (new Date().getTime() - currentData.lastFrameTimestamp),
        allEntities: currentData.entities,
      })
    )
    eventsRef.current = []
  }

  useInterval(step, paused ? null : 1000 / currentFrameRate)

  const ViewportElement = (
    <Viewport
      components={currentData.state.components || []}
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
        {showFrameRateControls && (
          <FrameRateControls
            paused={paused}
            setPaused={setPaused}
            currentFrameRate={currentFrameRate}
            setCurrentFrameRate={setCurrentFrameRate}
            step={step}
          />
        )}
        {ViewportElement}
        <DebugComponent
          systems={systems}
          entities={currentData.entities}
          setEntities={e => setData(d => ({ ...d, entities: e }))}
          state={currentData.state}
          setState={s => setData(d => ({ ...d, state: s }))}
        />
      </div>
    )
  }
}
