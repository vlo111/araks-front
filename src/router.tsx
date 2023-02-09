import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import VerticalSpace from './components/space/vertical-space';
import { PATHS } from './helpers/constants';
import ErrorPage from './pages/error';
import UiComponents from './pages/ui-components';


export const router = createBrowserRouter(
  [
    {
      path: PATHS.ROOT,
      element: <UiComponents />,
      errorElement: <ErrorPage />,
    },
    {
      path: PATHS.UI,
      element: <UiComponents />,
    },
  ]
);
