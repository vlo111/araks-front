import { Overview } from 'components/layouts/overview';
import { PrivateRoute } from 'components/routes/private-route';
import { DataSheet } from 'pages/data-sheet';
import { Folder } from 'pages/folder';
import { ProjectOverview } from 'pages/project-overview';
import { ProjectCreate } from 'pages/project-overview/create';
import { ProjectUpdate } from 'pages/project-overview/update';
import { ProjectScheme } from 'pages/project-scheme';
import { Public } from 'pages/public';
import { createBrowserRouter } from 'react-router-dom';
import { ProjectHome } from './components/layouts/project-home';
import { PublicRoutes } from './components/routes/public-route';
import { PATHS } from './helpers/constants';
import { Projects } from './pages/projects';
import { SignIn } from './pages/sign-in';
import { Profile } from './pages/profile';

export const router = createBrowserRouter([
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
    element: <PrivateRoute />,
    children: [
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
            path: PATHS.PROFILE,
            element: <Profile />,
          },
        ],
      },
      {
        element: <Overview />,
        children: [
          {
            path: PATHS.PROJECT_OVERVIEW,
            element: <ProjectOverview />,
          },
          {
            path: PATHS.PROJECT_UPDATE,
            element: <ProjectUpdate />,
          },
          {
            path: PATHS.PROJECT_CREATE,
            element: <ProjectCreate />,
          },
          {
            path: PATHS.PROJECT_SCHEME,
            element: <ProjectScheme />,
          },
          {
            path: PATHS.DATA_SHEET,
            element: <DataSheet />,
          },
        ],
      },
    ],
  },
]);
