import { SellAmount } from './utils'

export type ToggleSellWindow = {
  action: 'ToggleSellWindow'
}
export type ToggleUpgradeWindow = {
  action: 'ToggleUpgradeWindow'
}

export type SellResource = {
  action: 'SellResource'
  resource: string
  amount: SellAmount
}
export type UpgradeFacility = {
  action: 'UpgradeFacility'
  entityId: string
}

export type UIAction =
  | ToggleSellWindow
  | ToggleUpgradeWindow
  | SellResource
  | UpgradeFacility
