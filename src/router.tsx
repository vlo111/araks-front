import { Folder } from 'pages/folder';
import { ProjectOverview } from 'pages/project-overview';
import { Public } from 'pages/public';
import { createBrowserRouter } from 'react-router-dom';
import { ProjectHome } from './components/layouts/project-home';
import { PublicRoutes } from './components/routes/public-route';
import { PATHS } from './helpers/constants';
import { Projects } from './pages/projects';
import { SignIn } from './pages/sign-in';


export const router = createBrowserRouter(
  [
    {
      element: <PublicRoutes />,
      children: [
        {
          path: PATHS.ROOT,
          element: <SignIn />,
        },
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
        {
          path: PATHS.FOLDER,
          element: <Folder />,
        },
        {
          path: PATHS.PUBLIC,
          element: <Public />,
        },
        {
          path: PATHS.PROJECT_OVERVIEW,
          element: <ProjectOverview />,
        },
      ],
    },
  ]
);
