import * as React from 'react'

export enum ViewTypes {
    Block = 0,
    Grid = 1,
}

type Dispatch = React.Dispatch<React.SetStateAction<ViewTypes>>
type ViewProviderProps = {children: React.ReactNode}

const ViewContext = React.createContext<
  {state: ViewTypes; dispatch: Dispatch} | undefined
>(undefined)

function ViewProvider({children}: ViewProviderProps) {
  const [selectedView, setSlectedView] = React.useState<ViewTypes>(ViewTypes.Block);
  const value = React.useMemo(() => ({state: selectedView, dispatch: setSlectedView}), [selectedView])
  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  )
}

function useView() {
  const context = React.useContext(ViewContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a ViewProvider')
  }
  return context
}

export {ViewProvider, useView}