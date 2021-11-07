import React from 'react'
import { Entity, SystemQuery, System, GlobalState } from './types'

export default function applySystems<
  State,
  AdditionalGlobals extends object = {}
>(
  entities: Entity<any>[],
  systems: System<any, any, AdditionalGlobals>[],
  global: GlobalState<State, AdditionalGlobals>
): {
  entities: Entity<any>[]
  state: State
  lastFrameTimestamp: number
} {
  if (systems.length === 0) {
    return {
      entities,
      state: global.state,
      lastFrameTimestamp: new Date().getTime(),
    }
  } else {
    const [notApplicable, applicable] = splitEntitiesByQuery(
      entities,
      systems[0][1]
    )
    const systemOutput = systems[0][2](applicable, global)

    const newState = Array.isArray(systemOutput)
      ? undefined
      : systemOutput.state
    const newEntities = Array.isArray(systemOutput)
      ? systemOutput
      : systemOutput.entities

    const updatedEntities = newEntities
      ? [...notApplicable, ...newEntities]
      : entities
    const restSystems = applySystems(updatedEntities, systems.slice(1), {
      ...global,
      state: newState || global.state,
      allEntities: updatedEntities,
    })
    return {
      entities: restSystems.entities,
      state: restSystems.state,
      lastFrameTimestamp: restSystems.lastFrameTimestamp,
    }
  }
}

function splitEntitiesByQuery(
  entities: Entity<any>[],
  query: SystemQuery<any>
): [Entity<any>[], Entity<any>[]] {
  return entities.reduce(
    (acc, entity) =>
      entityPassesQuery(entity, query)
        ? ([acc[0], [...acc[1], entity]] as [Entity<any>[], Entity<any>[]])
        : ([[...acc[0], entity], acc[1]] as [Entity<any>[], Entity<any>[]]),
    [[], []] as [Entity<any>[], Entity<any>[]]
  )
}

export function entityPassesQuery(
  e: Entity<any>,
  query: SystemQuery<any>
): boolean {
  return query.every((q) => Object.keys(e.components).includes(q as string))
}
