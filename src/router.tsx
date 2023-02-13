import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { PublicRoutes } from './components/routes/public-route';
import VerticalSpace from './components/space/vertical-space';
import { PATHS } from './helpers/constants';
import ErrorPage from './pages/error';
import { SignIn } from './pages/sign-in';
import UiComponents from './pages/ui-components';


export const router = createBrowserRouter(
  [
    {
      path: PATHS.ROOT,
      element: <UiComponents />,
      errorElement: <ErrorPage />,
    },
    {
      element: <PublicRoutes />,
      children: [
        {
          path: PATHS.SIGN_IN,
          element: <SignIn />,
        },
      ],
    },
  ]
);
