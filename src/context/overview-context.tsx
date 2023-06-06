import { createContext, useContext, useMemo, useState } from 'react';

type Dispatch = React.Dispatch<React.SetStateAction<string | undefined>>;
type Props = { children: React.ReactNode };

const OverviewContext = createContext<{ state: string | undefined; dispatch: Dispatch } | undefined>(undefined);

const OverviewProvider = ({ children }: Props) => {
  const [pageName, setPageName] = useState<string | undefined>(undefined);
  const value = useMemo(() => ({ state: pageName, dispatch: setPageName }), [pageName]);
  return <OverviewContext.Provider value={value}>{children}</OverviewContext.Provider>;
};

const useOverview = () => {
  const context = useContext(OverviewContext);
  if (context === undefined) {
    throw new Error('useOverview must be used within a OverviewProvider');
  }
  return context;
};

export { OverviewProvider, useOverview };
