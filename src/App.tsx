import React from 'react'
import DebugView from './DebugView'
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
import { UiRenderSystem } from './systems/ui-render'
import { GlobalState } from './types'
import reducer from './ui/reducer'

function App() {
  const entities = generateEntities(towerMap.entities as any)

  return (
    <div>
      <GameEngine
        entities={entities}
        viewportWidth='80vw'
        viewportHeight='40vw'
        debug={true}
        DebugComponent={DebugView}
        showFrameRateControls={true}
        systems={[
          MiningSystem(),
          CarryingSystem(),
          CarryingAnimationSystem(),
          ProducingSystem(),
          MouseClickBoostSystem(400, 200),
          BoostIndicationSystem(),
          RenderSystem(400, 200),
          UiRenderSystem(400, 200, reducer),
        ]}
        initialState={
          {
            components: [],
            map: towerMap,
            gold: 0,
            boostedEntity: undefined,
            uiState: {
              openedWindow: null,
            },
          } as GlobalState
        }
      />
    </div>
  )
}

export default App
