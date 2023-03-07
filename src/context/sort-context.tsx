import * as React from 'react'

type Dispatch = React.Dispatch<React.SetStateAction<string | undefined>>
type ViewProviderProps = {children: React.ReactNode, defaultValue?: string}

const SortContext = React.createContext<
  {state: string | undefined; dispatch: Dispatch} | undefined
>(undefined)

function SortProvider({ children, defaultValue }: ViewProviderProps) {
  const [selectedSort, setSlectedSort] = React.useState<string | undefined>(defaultValue);
  const value = React.useMemo(() => ({state: selectedSort, dispatch: setSlectedSort}), [selectedSort])
  return (
    <SortContext.Provider value={value}>
      {children}
    </SortContext.Provider>
  )
}

function useSort() {
  const context = React.useContext(SortContext)
  if (context === undefined) {
    throw new Error('useSort must be used within a SortProvider')
  }
  return context
}

export {SortProvider, useSort}