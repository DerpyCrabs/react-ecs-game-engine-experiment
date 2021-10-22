import React from 'react'
import { Entity, SystemQuery, System, GlobalState } from './types'

export default function applySystems(
  entities: Entity<any>[],
  systems: System<any>[],
  global: GlobalState<any>
): {
  entities: Entity<any>[]
  components: React.ReactNode[]
  state: any
  lastFrameTimestamp: number
} {
  if (systems.length === 0) {
    return {
      entities,
      components: [],
      state: global.state,
      lastFrameTimestamp: new Date().getTime(),
    }
  } else {
    const [notApplicable, applicable] = splitEntitiesByQuery(
      entities,
      systems[0][1]
    )
    const {
      entities: newEntities,
      component,
      state: newState,
    } = systems[0][2](applicable, global)
    const restSystems = applySystems(
      newEntities ? [...notApplicable, ...newEntities] : entities,
      systems.slice(1),
      { ...global, state: newState || global.state }
    )
    return {
      entities: restSystems.entities,
      components: component
        ? [component, ...restSystems.components]
        : restSystems.components,
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
