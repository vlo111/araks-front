import client from 'api/client';
import { GetNeo4jData } from 'api/visualisation/use-get-data';
import { CalcExpandList, ExpandList, ExpandListData, GroupAndCountResult, GroupedData } from '../types';
import { renderTooltipModal } from './tooltip';
import { Graph, IEdge } from '@antv/g6';
import { allSvg, inSvg, outSvg } from './svgs';

export const getExpandData = async (id: string, project_edge_type_id: string, direction: string) => {
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const url = `${process.env.REACT_APP_BASE_URL}neo4j/expand/${projectId}`;

  const params: { params: { id: string; direction?: string; project_edge_type_id?: string } } = {
    params: {
      id,
    },
  };

  if (project_edge_type_id === 'all') {
    params.params.direction = 'all';
  } else {
    params.params.project_edge_type_id = project_edge_type_id;
    params.params.direction = direction;
  }

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
  const nodeContext = `<div class='menu'>
      <span>Focus on node</span>
      <span class="main-menu expand">Expand</span>
      <div class='menu submenu-container'>
        <div class='submenu'>
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

export const addTooltip = (graph: Graph) => {
  const defaultModes = graph.get('modes')?.default;

  if (!(defaultModes && defaultModes.find((a: { type: string }) => a.type === 'tooltip'))) {
    const el = document.getElementsByClassName('g6-tooltip');

    if (el.length) (el[0] as HTMLElement).remove();

    graph.addBehaviors(
      [
        {
          type: 'tooltip',
          formatText: (model: { [key: string]: unknown }) => {
            return renderTooltipModal(model);
          },
          offset: 10,
        },
      ],
      'default'
    );
  }
};

export const removeTooltip = (graph: Graph) => {
  graph.removeBehaviors('tooltip', 'default');

  const tooltips = document.getElementsByClassName('g6-tooltip');

  if (tooltips.length > 0) {
    const tooltip = tooltips[0] as HTMLElement;

    if (tooltips.length > 1) {
      tooltip.remove();
    } else {
      tooltip.style.display = 'none';
    }
  }
};
/**
 *
 * @param id
 * @param edges
 */
export const updateExpandList = (id: string, edges: IEdge[]) => {
  (async () => {
    const expandList = await getExpandList(id);

    const { result, grandTotal } = calcExpandList(expandList ?? [], edges);

    const allData = `<span id="all"><p>${allSvg}</p> All (${grandTotal})</span>`;

    const list = expandList?.length
      ? `${result
          .map(
            (l) => `
            <div class="row">
            <div class="hidden">${l.project_edge_type_id} ${l.direction}</div>
              <p>
                ${l.direction === 'in' ? inSvg : outSvg}
              </p>
              <div class="right-section">
                <p class="name">${l.name}</p>
                <p>(${l.total})</p>
              </div>
            </div>`
          )
          .join(' ')}`
      : '';

    const menuContainer = document.querySelector('.submenu');

    if (menuContainer) {
      menuContainer.innerHTML = `${allData}${list}`;
    }
  })();
};

const calcExpandList: CalcExpandList = (data, visualizedConnections) => {
  const visualizedIds = new Set(visualizedConnections.map((conn) => conn.getID()));

  const notVisualizedData = data.filter((conn) => !visualizedIds.has(conn.id));

  const groupAndCount = (data: ExpandList): GroupAndCountResult => {
    const grouped: { [key: string]: GroupedData } = {};
    data.forEach((item) => {
      const key = `${item.name}-${item.direction}`;
      if (!grouped[key]) {
        grouped[key] = {
          name: item.name,
          project_edge_type_id: item.project_edge_type_id,
          direction: item.direction,
          total: 0,
        };
      }
      grouped[key].total += 1;
    });

    const result = Object.values(grouped).sort(
      (a, b) => a.name.localeCompare(b.name) || a.direction.localeCompare(b.direction)
    );

    const grandTotal = data.length;

    return { result, grandTotal };
  };

  const { result, grandTotal } = groupAndCount(notVisualizedData);

  return { result, grandTotal };
};
