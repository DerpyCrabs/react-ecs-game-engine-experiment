export type ToggleResourceSellWindow = { action: 'ToggleResourceSellWindow' }
export type SellResource = {action: 'SellResource', resource: string, amount: number}

export type UIAction = ToggleResourceSellWindow | SellResource
