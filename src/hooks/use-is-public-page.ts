import { PATHS } from 'helpers/constants';
import { useLocation } from 'react-router-dom';

export const useIsPublicPage = () => {
  const { pathname } = useLocation();
  return pathname.startsWith(PATHS.PUBLIC_PREFIX);
};
