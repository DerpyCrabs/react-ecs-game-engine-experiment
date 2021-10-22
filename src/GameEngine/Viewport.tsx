import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Event } from './types'

export default function Viewport({
  viewportRef,
  viewportWidth,
  viewportHeight,
  components,
  eventsRef,
}: {
  viewportRef: (e?: HTMLElement | null) => void
  viewportHeight: number | string
  viewportWidth: number | string
  components: React.ReactNode[]
  eventsRef: React.MutableRefObject<Event[]>
}) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    eventsRef.current.push({
      kind: 'mouseDown',
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    })
  }

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    eventsRef.current.push({
      kind: 'mouseUp',
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    })
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    eventsRef.current.push({
      kind: 'mouseMove',
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    })
  }

  useHotkeys(
    '*',
    (e: KeyboardEvent) => {
      eventsRef.current.push({
        kind: 'keyDown',
        key: e.key,
      })
    },
    { keydown: true }
  )

  useHotkeys(
    '*',
    (e: KeyboardEvent) => {
      eventsRef.current.push({
        kind: 'keyUp',
        key: e.key,
      })
    },
    { keyup: true }
  )

  return (
    <div
      ref={viewportRef}
      style={{
        width: viewportWidth,
        height: viewportHeight,
        backgroundColor: 'black',
        position: 'relative',
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {components.map((c, i) => (
        <div key={i}>{c}</div>
      ))}
    </div>
  )
}
