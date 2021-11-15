export type ToggleWindow = {
  action: 'ToggleWindow'
  window: 'upgrade' | 'sell' | null
}
export type SellResource = {
  action: 'SellResource'
  resource: string
  amount: number
}
export type UpgradeFacility = {
  action: 'UpgradeFacility'
  entityId: string
}

export type UIAction = ToggleWindow | SellResource | UpgradeFacility
