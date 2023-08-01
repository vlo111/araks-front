import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { UserProjectRole } from 'api/types';

type ContextType = { role: UserProjectRole | null };

interface ProjectInfoContextType {
  projectInfo: ContextType | null;
  setProjectInfo: React.Dispatch<React.SetStateAction<ContextType | null>>;
  updateRole: (role: UserProjectRole | null) => void;
}

type ViewProviderProps = { children: React.ReactNode };

const ProjectContext = createContext<ProjectInfoContextType | null>(null);

function ProjectProvider({ children }: ViewProviderProps) {
  const [projectInfo, setProjectInfo] = useState<ContextType | null>(null);
  const updateRole = useCallback((role: UserProjectRole | null) => {
    setProjectInfo((prev) => ({
      ...prev,
      role: role ?? null,
    }));
  }, []);
  const value = useMemo(() => ({ projectInfo, setProjectInfo, updateRole }), [projectInfo, updateRole]);
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  if (context === null) {
    throw new Error('projectInfo cannot be null');
  }
  return context;
}

export { ProjectProvider, useProject };
