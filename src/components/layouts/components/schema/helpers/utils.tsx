import client from 'api/client';
import { TYPE_POSITION_URL } from 'api/schema/type/use-update-types-position';
import { closeTypeEye, openTypeEye, PATH } from './constants';
import {
  AddTypePerspective,
  AnimateGraphFit,
  ChangeTypePosition,
  GetTypeColors,
  ISelectedPerspective,
  SwitchTypePermission,
} from '../types';
import { URL_ADD_PERSPECTIVE_TYPE, URL_REMOVE_PERSPECTIVE_TYPE } from 'api/perspective/use-add-type-perspective';

export const animateGraphFit: AnimateGraphFit = (graph, sec) => {
  const stage = graph.view.stage.parentElement as HTMLElement;
  stage.style.transitionDuration = sec;
  setTimeout(() => {
    stage.style.transitionDuration = '0s';
  }, 10);
};

export const getTypeColors: GetTypeColors = (edge) => [
  edge.attr(PATH.EDGE_SOURCE_COLOR),
  edge.attr(PATH.EDGE_TARGET_COLOR),
];

export const isPerspective = () => location.pathname.includes('/perspectives/');

export const changeTypePosition: ChangeTypePosition = (id, { x, y }) =>
  client.put(`${TYPE_POSITION_URL.replace(':id', id)}`, { fx: x, fy: y });

export const switchTypePermission: SwitchTypePermission = (node, isAllow) => {
  if (isAllow) node.setAttrs(closeTypeEye);
  else node.setAttrs(openTypeEye);
};

export const getPerspectiveData = (): ISelectedPerspective | null => {
  const data = localStorage.getItem('selected-perspective');
  return data ? JSON.parse(data) : null;
};

export const addTypePerspective: AddTypePerspective = (type_id) => {
  const { perspectiveId, project_id } = getPerspectiveData() ?? {};

  return perspectiveId ? client.post(`${URL_ADD_PERSPECTIVE_TYPE}/${perspectiveId}`, { project_id, type_id }) : null;
};

export const removeTypePerspective: AddTypePerspective = (type_id) => {
  const { perspectiveId, project_id } = getPerspectiveData() ?? {};

  return perspectiveId ? client.put(`${URL_REMOVE_PERSPECTIVE_TYPE}/${perspectiveId}`, { project_id, type_id }) : null;
};
