import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { useCallback, useState } from 'react';
import { UserProjectRole } from 'api/types';

type ContextType = { role: UserProjectRole | null };

interface ProjectInfoContextType {
  projectInfo: ContextType | null;
  setProjectInfo: React.Dispatch<React.SetStateAction<ContextType | null>>;
  updateRole: (role: UserProjectRole | null) => void;
}

export const PrivateRoute = () => {
  const { user } = useAuth();

  const [projectInfo, setProjectInfo] = useState<ContextType | null>(null);
  // eslint-disable-next-line no-console
  console.log('projectInfo', projectInfo);
  const updateRole = useCallback((role: UserProjectRole | null) => {
    setProjectInfo((prev) => ({
      ...prev,
      role: role ?? null,
    }));
  }, []);

  if (!user) {
    return <Navigate to={PATHS.SIGN_IN} />;
  }

  return (
    <>
      <Outlet context={{ projectInfo, setProjectInfo, updateRole }} />
    </>
  );
};

export function useProjectInfo() {
  return useOutletContext<ProjectInfoContextType>();
}
