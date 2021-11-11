import React from 'react'
import GameEngine from './engine'
import generateEntities from './entities/generateEntities'
import towerMap from './maps/tower'
import { BoostIndicationSystem } from './systems/boost-indication'
import { CarryingSystem } from './systems/carrying'
import { CarryingAnimationSystem } from './systems/carrying-animation'
import { MiningSystem } from './systems/mining'
import { MouseClickBoostSystem } from './systems/mouse-click-boost'
import { ProducingSystem } from './systems/producing'
import { RenderSystem } from './systems/render'

function App() {
  const entities = generateEntities(towerMap as any)

  return (
    <div>
      <GameEngine
        entities={entities}
        viewportWidth='60vh'
        viewportHeight='30vh'
        debug={true}
        showFrameRateControls={true}
        systems={[
          MiningSystem(),
          CarryingSystem(),
          CarryingAnimationSystem(),
          ProducingSystem(),
          MouseClickBoostSystem(400, 200),
          BoostIndicationSystem(),
          RenderSystem(400, 200),
        ]}
        initialState={{ components: [], map: towerMap }}
      />
    </div>
  )
}

export default App
