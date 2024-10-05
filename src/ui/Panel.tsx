import { UIProps } from '../types'
import ResourceSellWindow from './ResourceSellWindow'
import UpgradeWindow from './UpgradeWindow'

export default function Panel({ entities, state, dispatch }: UIProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <div>
        <div
          style={{
            backgroundColor: 'lightblue',
            display: 'flex',
            width: '600px',
            justifyContent: 'space-between',
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <button style={{ width: '80px' }} onClick={() => dispatch({ action: 'ToggleSellWindow' })}>
            Sell
          </button>

          <span style={{ paddingRight: 5 }}>Gold: {state.gold}</span>
          <button style={{ width: '80px' }} onClick={() => dispatch({ action: 'ToggleUpgradeWindow' })}>
            Upgrade
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 9999999,
            maxHeight: '100px',
          }}
        >
          <ResourceSellWindow {...{ entities, state, dispatch }} />
          <div></div>
          <UpgradeWindow {...{ entities, state, dispatch }} />
        </div>
      </div>
    </div>
  )
}
