import { Overview } from 'components/layouts/overview';
import { PrivateRoute } from 'components/routes/private-route';
import { DataSheet } from 'pages/data-sheet';
import { Folder } from 'pages/folder';
import { ProjectOverview } from 'pages/project-overview';
import { ProjectCreate } from 'pages/project-overview/create';
import { ProjectUpdate } from 'pages/project-overview/update';
import { ProjectScheme } from 'pages/project-scheme';
import { Public } from 'pages/public';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { ProjectHome } from './components/layouts/project-home';
import { PublicRoutes } from './components/routes/public-route';
import { PATHS } from './helpers/constants';
import { Projects } from './pages/projects';
import { SignIn } from './pages/sign-in';
import { Profile } from './pages/profile';
import { ProjectPerspectives } from './pages/project-perspectives';
import { ProjectVisualisation } from './pages/project-visualisation';
import { Shared } from 'pages/shared';
import { ForgotPassword } from './pages/forgot-password';
import { ResetPassword } from './pages/reset-password';
import { ErrorServer } from 'pages/error/errorServer';
import { ErrorNotFound } from 'pages/error/errorNotFound';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: '*',
        element: <ErrorNotFound />,
      },
      {
        path: PATHS.ERRORNORFOUND,
        element: <ErrorNotFound />,
      },
      {
        path: PATHS.ERRORSERVER,
        element: <ErrorServer />,
      },
    ],
  },
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
      {
        path: PATHS.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: PATHS.RESET_PASSWORD,
        element: <ResetPassword />,
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
            path: PATHS.SHARED,
            element: <Shared />,
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
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.PROJECT_OVERVIEW}`,
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
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.PROJECT_SCHEME}`,
            element: <ProjectScheme />,
          },
          {
            path: PATHS.PROJECT_PERSPECTIVES,
            element: <ProjectPerspectives />,
          },
          {
            path: PATHS.PROJECT_VISUALISATION,
            element: <ProjectVisualisation />,
          },
          {
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.PROJECT_VISUALISATION}`,
            element: <ProjectVisualisation />,
          },
          {
            path: PATHS.DATA_SHEET,
            element: <DataSheet />,
          },
          {
            path: `${PATHS.PUBLIC_PREFIX}${PATHS.DATA_SHEET}`,
            element: <DataSheet />,
          },
          {
            path: PATHS.NODE_OVERVIEW,
            element: <DataSheet />,
          },
          // {
          //   path: "*",
          //   element: <ErrorNotFound />,
          // },
        ],
      },
    ],
  },
]);
