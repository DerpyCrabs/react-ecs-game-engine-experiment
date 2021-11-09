import { EntityId } from '../components'
import { Component, Entity } from '../engine'

export default function generateEntities(map: {
  [id: EntityId]: { [k: string]: Component }
}): Entity<any>[] {
  return Object.entries(map).map(([id, components]) => ({
    components: { ...components, entityId: { id } },
  }))
}
