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
  entities: {
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
          [ItemType.Ore]: 0,
        },
      },
      level: {
        level: 1,
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
          [ItemType.Ore]: 0,
          [ItemType.Brick]: 0,
        },
      },
      level: {
        level: 1,
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
          [ItemType.Ore]: 0,
        },
      },
      level: {
        level: 1,
      },
    },
  },
  resources: {
    [ItemType.Ore as string]: {
      cost: 2,
    },
    [ItemType.Brick]: {
      cost: 5,
    },
  },
  upgrades: {
    [EntityId.OreMine as string]: {
      speed: (level: number) => 0.5 * level,
      upgradeCost: (level: number) => 50 * level * 1.2,
    },
    [EntityId.OreCarrier]: {
      speed: (level: number) => 0.4 * level,
      upgradeCost: (level: number) => 40 * level * 1.2,
      capacity: (level: number) => 2 + Math.floor(level / 2),
    },
    [EntityId.BrickMaker]: {
      speed: (level: number) => 0.5 * level,
      upgradeCost: (level: number) => 50 * level * 1.2,
    },
  },
}

export default towerMap
