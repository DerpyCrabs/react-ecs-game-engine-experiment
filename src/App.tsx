import React from 'react'
import GameEngine from './engine'
import { brickMaker } from './entities/brick-maker'
import { miner } from './entities/miner'
import { oreCarrier } from './entities/ore-carrier'
import { CarryingSystem } from './systems/carrying'
import { CarryingAnimationSystem } from './systems/carrying-animation'
import { MiningSystem } from './systems/mining'
import { ProducingSystem } from './systems/producing'
import { RenderSystem } from './systems/render'

function App() {
  const entities = [miner, brickMaker, oreCarrier]

  return (
    <div>
      <GameEngine
        entities={entities}
        viewportWidth='60vh'
        viewportHeight='30vh'
        debug={true}
        systems={[
          MiningSystem(),
          CarryingSystem(),
          CarryingAnimationSystem(),
          ProducingSystem(),
          RenderSystem(400, 200),
        ]}
        initialState={{}}
      />
    </div>
  )
}

export default App
