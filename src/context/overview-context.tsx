import { createContext, useContext, useMemo, useState } from 'react';

type Dispatch = React.Dispatch<React.SetStateAction<string | undefined>>;
type Props = { children: React.ReactNode };

type ContextType =
  | undefined
  | {
      state: string | undefined;
      dispatch: Dispatch;
      hideLeftSection: boolean;
      setHideLeftSection: (queriesOpen: boolean | ((prev: boolean) => boolean)) => void;
    };

const OverviewContext = createContext<ContextType>(undefined);

const OverviewProvider = ({ children }: Props) => {
  const [pageName, setPageName] = useState<string | undefined>(undefined);
  const [hideLeftSection, setHideLeftSection] = useState<boolean>(false);
  const value = useMemo(
    () => ({ state: pageName, dispatch: setPageName, hideLeftSection, setHideLeftSection }),
    [hideLeftSection, pageName]
  );
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
