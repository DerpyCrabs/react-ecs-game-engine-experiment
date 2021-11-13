import React from 'react'
import { EntityId } from './components'
import { Component, Entity, RSystem } from './engine'
import towerMap from './maps/tower'
import { UIAction } from './ui/actions'

export type GlobalState = {
  boostedEntity?: EntityId
  gold: number
  map: typeof towerMap
  components: React.ReactNode[]
  uiState: {
    sellWindowOpen: boolean
  }
}

export type System<Components extends { [key: string]: Component } = {}> =
  RSystem<Components, GlobalState>


export type UIProps = {
  entities: Entity<any>[]
  state: GlobalState
  dispatch: (e: UIAction) => void
}