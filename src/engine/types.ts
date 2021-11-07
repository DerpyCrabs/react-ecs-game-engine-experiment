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

export type GlobalState<State, AdditionalFields = {}> = {
  input: Event[]
  viewportHeight: number
  viewportWidth: number
  state: State
  lastFrameTimestamp: number
  allEntities: Entity<any>[]
} & AdditionalFields

export type System<
  Components extends { [key: string]: Component } = {},
  State = any,
  AdditionalGlobals = { frameRate: number }
> = [
  string,
  SystemQuery<Components>,
  (
    entities: Entity<Components>[],
    global: GlobalState<State, AdditionalGlobals>
  ) =>
    | {
        entities?: Entity<any>[]
        state?: State
      }
    | Entity<any>[]
]

export interface DebugComponentProps {
  systems: System<any>[]
  entities: Entity<any>[]
  state: any
  setEntities: (e: Entity<any>[]) => void
  setState: (s: any) => void
}
