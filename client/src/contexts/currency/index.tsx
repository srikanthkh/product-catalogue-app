import * as React from 'react'

interface Action {
    type: 'UPDATE_CURRENCY',
    payload: string
}

interface State {
    currency : string
}
type Dispatch = (action: Action) => void

interface CurrencyProviderProps {
    children: React.ReactNode
}

const CurrencyStateContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined)

function currencyReducer(state: State, action: Action) {
  switch (action.type) {
    case 'UPDATE_CURRENCY': {
      return { currency: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CurrencyProvider({children}: CurrencyProviderProps) {
  const [state, dispatch] = React.useReducer(currencyReducer, { currency: "USD"})
  const value = {state, dispatch}
  return (
    <CurrencyStateContext.Provider value={value}>
      {children}
    </CurrencyStateContext.Provider>
  )
}

function useCurrency() {
  const context = React.useContext(CurrencyStateContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export { CurrencyProvider, useCurrency }