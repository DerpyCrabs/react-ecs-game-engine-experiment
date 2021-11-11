import React from 'react'
import { EntityId } from './components'
import { Component, RSystem } from './engine'
import towerMap from './maps/tower'

export type GlobalState = {
  boostedEntity?: EntityId
  gold: number
  map: typeof towerMap
  components: React.ReactNode[]
}

export type System<Components extends { [key: string]: Component } = {}> =
  RSystem<Components, GlobalState>
