import { EntityId } from './components'
import { Component, RSystem } from './engine'

export type GlobalState = {
  boostedEntity?: EntityId
}

export type System<Components extends { [key: string]: Component } = {}> =
  RSystem<Components, GlobalState>
