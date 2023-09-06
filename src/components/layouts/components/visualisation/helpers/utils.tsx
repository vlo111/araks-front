import client from 'api/client';
import { GetNeo4jData } from 'api/visualisation/use-get-data';
import { ExpandList, ExpandListData } from '../types';
import { allSvg, inSvg, outSvg } from './svgs';

export const getExpandData = async (id: string, project_edge_type_id: string) => {
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const url = `${process.env.REACT_APP_BASE_URL}neo4j/expand/${projectId}`;

  const params = {
    params: {
      id,
      project_edge_type_id,
      direction: 'all',
    },
  };

  const data: GetNeo4jData = await client.get(url, params);

  return data.data;
};

export const getExpandList = async (id: string) => {
  const expandList: ExpandListData | null = await client.get(
    `${process.env.REACT_APP_BASE_URL}neo4j/expand-list/${location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    )}`,
    {
      params: { id },
    }
  );

  return expandList?.data.relations;
};

/**
 * Render Context Menu Modal
 * Get expandList from localStorage which is saved from node:mouseenter event
 * @param id
 * @param isNode
 */
export const getMenuContexts = (id: string, isNode: boolean) => {
  const expandList: ExpandList = isNode ? JSON.parse(localStorage.getItem('node') ?? '') : [];

  localStorage.removeItem('node');

  const list = expandList.length
    ? `${expandList
        .map(
          (l) =>
            `<span id="${l.project_edge_type_id}"><p>${l.direction === 'in' ? inSvg : outSvg}</p> ${l.name} (${
              l.count
            })</span>`
        )
        .join()
        .replaceAll(',', ' ')}`
    : '';

  const allCount = expandList.reduce((prev, acc) => acc.count + prev, 0);

  const allData = `<span id="all"><p>${allSvg}</p> All (${allCount})</span>`;

  const nodeContext = `<div class='menu'>
      <span>Focus on node</span>
      <span class="main-menu expand">Expand</span>
      <div class='menu submenu-container'>
        <div class='submenu'>
          ${allData}
          ${list}
        </div>
      </div>
      <span class='delete'>Delete</span>
    </div>`;

  const canvasContext = `<div class='menu'>
      <span>Create Node</span>
    </div>`;

  const edgeContext = `<div class='menu'>
      <span class='delete'>Delete</span>
    </div>`;

  const comboContext = `<div class='menu'>
      <span class='delete'>Delete</span>
    </div>`;

  return { canvasContext, nodeContext, comboContext, edgeContext };
};
