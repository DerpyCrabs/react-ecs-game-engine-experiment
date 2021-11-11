import React from 'react'
import { entityPassesQuery } from './apply-systems'
import { DebugComponentProps } from './types'

export default function DefaultDebugView({
  systems,
  entities,
  state,
  setEntities,
  setState,
}: DebugComponentProps) {
  return (
    <div>
      <h1>Systems</h1>
      {systems.map((system, i) => (
        <div key={i}>
          {JSON.stringify(system[0])}: {JSON.stringify(system[1])}
        </div>
      ))}
      <h1>State</h1>
      {JSON.stringify(state)}
      <h1>Entities</h1>
      {entities.map((entity, i) => (
        <div key={i}>
          {i}: {JSON.stringify(entity)}, applicableSystems:{' '}
          {JSON.stringify(
            systems
              .map(s => (entityPassesQuery(entity, s[1]) ? s[0] : undefined))
              .filter(s => s !== undefined)
          )}
        </div>
      ))}
    </div>
  )
}
