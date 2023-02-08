import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { PATHS } from './helpers/constants';
import UiComponents from './pages/ui-components';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={PATHS.UI} element={<UiComponents />} />
    </>
  )
);
