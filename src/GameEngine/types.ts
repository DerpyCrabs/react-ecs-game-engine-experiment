export interface Component {}

export interface Entity<Components extends { [key: string]: Component }> {
  components: Components
}

export type SystemQuery<Components extends { [key: string]: any }> =
  (keyof Components)[]

export type Event =
  | KeyDownEvent
  | KeyUpEvent
  | MouseUpEvent
  | MouseMoveEvent
  | MouseDownEvent

export interface MouseDownEvent {
  kind: 'mouseDown'
  x: number
  y: number
}

export interface MouseUpEvent {
  kind: 'mouseUp'
  x: number
  y: number
}

export interface MouseMoveEvent {
  kind: 'mouseMove'
  x: number
  y: number
}

export interface KeyDownEvent {
  kind: 'keyDown'
  key: string
}

export interface KeyUpEvent {
  kind: 'keyUp'
  key: string
}

export interface GlobalState<State> {
  input: Event[]
  viewportHeight: number
  viewportWidth: number
  state: State
  lastFrameTimestamp: number
}

export type System<
  Components extends { [key: string]: Component } = {},
  State = any
> = [
  string,
  SystemQuery<Components>,
  (
    entities: Entity<Components>[],
    global: GlobalState<State>
  ) => {
    entities?: Entity<any>[]
    component?: React.ReactNode
    state?: State
  }
]
