import { EntityIdComponent, LevelComponent } from '../components'
import { Entity } from '../engine'
import towerMap from '../maps/tower'
import { UIProps } from '../types'

export default function UpgradeWindow({ entities, state, dispatch }: UIProps) {
  if (!state.uiState.isUpgradeWindowOpen) {
    return null
  }

  const upgradableEntities = entities
    .filter((e) => e.components.level && e.components.entityId && towerMap.upgrades[e.components.entityId.id])
    .map((e) => [e.components.entityId.id, e]) as [
    string,
    Entity<{
      level: LevelComponent
      entityId: EntityIdComponent
    }>
  ][]

  return (
    <div style={{ backgroundColor: 'lightcyan', overflowY: 'auto', width: '35%' }}>
      {upgradableEntities.map(([entityId, entity]) => (
        <div key={entityId} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            {entityId}: {entity.components.level.level}
          </span>
          <button
            onClick={() =>
              dispatch({
                action: 'UpgradeFacility',
                entityId,
              })
            }
          >
            Upgrade for {towerMap.upgrades[entityId].upgradeCost(entity.components.level.level + 1)}
          </button>
        </div>
      ))}
    </div>
  )
}
