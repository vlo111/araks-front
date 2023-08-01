import { Navigate, Outlet } from 'react-router-dom';

import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { ProjectProvider } from 'context/project-context';

export const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATHS.SIGN_IN} />;
  }

  return (
    <ProjectProvider>
      <Outlet />
    </ProjectProvider>
  );
};
