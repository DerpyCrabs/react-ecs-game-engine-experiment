export interface State {
    currencies: {
        gold: number
    }
}

export const defaultState: State = {
    currencies: {
        gold: 0
    }
}