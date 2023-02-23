import { createBrowserRouter } from 'react-router-dom';
import { ProjectHome } from './components/layouts/project-home';
import { PublicRoutes } from './components/routes/public-route';
import { PATHS } from './helpers/constants';
import ErrorPage from './pages/error';
import { Projects } from './pages/projects';
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
    {
      element: <ProjectHome />,
      children: [
        {
          path: PATHS.PROJECTS,
          element: <Projects />,
        },
      ],
    },
  ]
);
