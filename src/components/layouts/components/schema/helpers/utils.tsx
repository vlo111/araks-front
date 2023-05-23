import { AnimateGraphFit, ChangeTypePosition, GetTypeColors, SwitchPermission, SwitchTypePermission } from '../types';
import { PATH } from 'helpers/constants';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { closePropertyEye, closeTypeEye, openPropertyEye, openTypeEye } from './constants';
import client from 'api/client';
import { TYPE_POSITION_UPDATE_URL } from 'api/schema/type/use-update-types-position';

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

export const getProperties = (list: IProjectType[], edge: ProjectEdgeResponse) => {
  const { color, properties } = list.find((n) => n.id === edge.source_id) || {};
  const { color: targetColor, properties: targetProperties } = list.find((n) => n.id === edge.target_id) || {};

  const { name, default_proprty } = properties?.find((a) => a.id === edge.source_attribute_id) || {};
  const { name: targetName, default_proprty: targetDefault } =
    targetProperties?.find((a) => a.id === edge.target_attribute_id) || {};

  return {
    color,
    targetColor,
    name,
    targetName,
    default_proprty,
    targetDefault,
  };
};

export const changeTypePosition: ChangeTypePosition = (id, x, y) => {
  client.put(`${process.env.REACT_APP_BASE_URL}${TYPE_POSITION_UPDATE_URL.replace(':id', id)}`, {
    fx: x - 120,
    fy: y - 20,
  });
};

export const switchPermission: SwitchPermission = (node, portId = '', isAllow) => {
  if (isAllow) node.setPortProp(portId, 'attrs', closePropertyEye);
  else node.setPortProp(portId, 'attrs', openPropertyEye);
};

export const switchTypePermission: SwitchTypePermission = (node, isAllow) => {
  if (isAllow) node.setAttrs(closeTypeEye);
  else node.setAttrs(openTypeEye);
};
