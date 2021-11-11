import React from 'react'
import { DebugComponentProps, Entity } from './engine'
import { GlobalState } from './types'
import './DebugView.css'
import { OccupationComponent } from './components'

function getOccupationType(components: any): string {
  if (components.extractionOccupation) {
    return 'Extraction'
  } else if (components.producingOccupation) {
    return 'Production'
  } else if (components.carryingOccupation) {
    return 'Carrying'
  } else {
    return 'Unknown'
  }
}

function getCommonOccupationParams(components: any): OccupationComponent {
  return (
    components.extractionOccupation ||
    components.producingOccupation ||
    components.carryingOccupation
  )
}

export default function DebugView({
  state,
  entities,
}: {
  state: GlobalState
  entities: Entity<any>[]
}) {
  return (
    <div>
      <span>gold: {state.gold.toString()}</span>
      <table>
        <thead>
          <tr>
            <th>Entity</th>
            <th>OccupationType</th>
            <th>Speed</th>
            <th>Progress</th>
            <th>Ore</th>
            <th>Brick</th>
            <th>Boosted?</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((e: Entity<any>, i: number) => (
            <tr key={i}>
              <td>{e.components.entityId?.id}</td>
              <td>{getOccupationType(e.components)}</td>
              <td>{getCommonOccupationParams(e.components).speed}</td>
              <td>
                {Math.round(
                  getCommonOccupationParams(e.components).progress * 100
                ) / 100}
              </td>
              <td>{e.components.storage?.items?.Ore || 0}</td>
              <td>{e.components.storage?.items?.Brick || 0}</td>
              <td>
                {e.components.entityId?.id === state.boostedEntity ? '+' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
