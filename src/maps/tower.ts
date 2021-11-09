enum EntityId {
  OreMine = 'OreMine',
  BrickMaker = 'BrickMaker',
  OreCarrier = 'OreCarrier',
}

enum ItemType {
  Ore = 'Ore',
  Brick = 'Brick',
}

const towerMap = {
  [EntityId.OreMine as string]: {
    position: { x: 80, y: 30 },
    size: { width: 50, height: 50 },
    sprite: { color: 'red' },
    extractionOccupation: {
      speed: 0.5,
      progress: 0.0,
      itemType: ItemType.Ore,
    },
    storage: {
      items: {
        ore: 0,
      },
    },
  },
  [EntityId.BrickMaker]: {
    position: { x: 120, y: 100 },
    size: { width: 50, height: 50 },
    sprite: { color: 'lightblue' },
    producingOccupation: {
      speed: 0.5,
      inputItemType: ItemType.Ore,
      outputItemType: ItemType.Brick,
      progress: 0.0,
    },
    storage: {
      items: {
        ore: 0,
        brick: 0,
      },
    },
  },
  [EntityId.OreCarrier]: {
    position: { x: 80, y: 30 },
    size: { width: 20, height: 20 },
    sprite: { color: 'blue', zIndex: 10 },
    carryingOccupation: {
      speed: 0.4,
      capacity: 3,
      itemType: ItemType.Ore,
      progress: 0.0,
      sourceFacility: EntityId.OreMine,
      destinationFacility: EntityId.BrickMaker,
    },
    storage: {
      items: {
        ore: 0,
      },
    },
  },
}

export default towerMap
