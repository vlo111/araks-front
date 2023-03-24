import { Navigate, Outlet } from 'react-router-dom';

import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';

export const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATHS.SIGN_IN} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
