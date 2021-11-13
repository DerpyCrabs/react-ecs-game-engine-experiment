import React from 'react'
import { Entity } from '../engine'
import { GlobalState, System } from '../types'
import { UIAction } from '../ui/actions'
import UI from '../ui/UI'

type UiRenderSystemQuery = {}

let actions: UIAction[] = []
const dispatch = (a: UIAction) => {
  actions.push(a)
}

export function UiRenderSystem(
  width: number,
  height: number,
  reducer: (
    s: GlobalState,
    es: Entity<any>[],
    a: UIAction
  ) => [GlobalState, Entity<any>[]]
): System<UiRenderSystemQuery> {
  return [
    'UiRenderSystem',
    [],
    (entities, { viewportHeight, viewportWidth, state }) => {
      const [newState, newEntities] = actions.reduce(
        ([s, es], a) => reducer(s, es, a),
        [state, entities]
      )
      actions = []

      return {
        entities: newEntities,
        state: {
          ...newState,
          components: [
            ...state.components,
            <UI
              key='ui'
              entities={entities}
              state={state}
              dispatch={dispatch}
            />,
          ],
        },
      }
    },
  ]
}
