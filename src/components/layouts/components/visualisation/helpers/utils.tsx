import client from 'api/client';
import { GetNeo4jData } from 'api/visualisation/use-get-data';
import { CalcExpandList, ExpandList, ExpandListData, GroupAndCountResult, GroupedData } from '../types';
import { renderTooltipModal } from './tooltip';
import { Graph, IEdge, INode, Item } from '@antv/g6';
import { allSvg, inSvg, outSvg } from './svgs';
import { formattedData } from './format-node';

export const getExpandData = async (id: string, project_edge_type_id: string, direction: string) => {
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const url = `${process.env.REACT_APP_BASE_URL}neo4j/expand/${projectId}`;

  const params: { params: { id: string; direction?: string; project_edge_type_id?: string } } = {
    params: {
      id,
    },
  };

  if (project_edge_type_id) {
    params.params.project_edge_type_id = project_edge_type_id;
    params.params.direction = direction;
  } else {
    params.params.direction = 'all';
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
export const getMenuContexts = (id: string, isNode: boolean, isEdit: boolean) => {
  const nodeContext = `<div class='menu'>
      <span class='focus'>Focus on node</span>
      <span class="main-menu expand">Expand</span>
      <div class='menu submenu-container'>
        <div class='submenu'>
        </div>
      </div>
      <span class="shortest-path">Shortest path</span>
      ${isEdit ? "<span class='delete'>Delete</span>" : ''}
    </div>`;

  const canvasContext = `<div class='menu'>
      ${isEdit ? '<span>Create Node</span>' : ''}
      <span class="export">Export/PNG</span>
    </div>`;

  const edgeContext = `<div class='menu'>
      ${isEdit ? "<span class='delete'>Delete</span>" : ''}
    </div>`;

  const comboContext = `<div class='menu'>
      ${isEdit ? "<span class='delete'>Delete</span>" : ''}
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
                ${l.direction === 'in' ? outSvg : inSvg}
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

export const expand = async (
  graph: Graph,
  item: Item,
  target: HTMLElement,
  setGraphInfo: (info: { nodeCount?: number | undefined; nodeCountAPI?: number | undefined }) => void
) => {
  const textContent = target.closest('.row')?.firstElementChild?.textContent?.trim();

  const [project_edge_type_id, direction] = textContent?.split(' ') ?? [];

  const nodeId = (item._cfg?.model as { id: string })?.id ?? '';

  const expandData = await getExpandData(nodeId, project_edge_type_id, direction);

  const graphData = formattedData(expandData.nodes, expandData.edges);

  const radius = 200;

  graphData.nodes.forEach((n, index) => {
    graph.addItem('node', {
      ...n,
      x: (item?._cfg?.model?.x ?? 0) + radius * Math.sin((Math.PI * 2 * index) / graphData.nodes.length),
      y: (item?._cfg?.model?.y ?? 0) - radius * Math.cos((Math.PI * 2 * index) / graphData.nodes.length),
    });
  });

  graphData.edges.forEach((e) => {
    graph.addItem('edge', e);
  });

  setGraphInfo({
    nodeCount: graph.getNodes().length,
  });
};

export const createCombos = (graph: Graph) => {
  if (graph.getCombos().length) {
    removeCombos(graph);
  } else {
    // Step 1: Group Nodes by Color
    const nodesByType = new Map<string, INode[]>();

    graph.getNodes().forEach((node) => {
      const type = node.getModel().nodeType as string;
      if (!nodesByType.has(type)) {
        nodesByType.set(type, []);
      }
      nodesByType.get(type)?.push(node);
    });

    // Step 2: Create Combos for Each Group
    nodesByType.forEach((nodes, type) => {
      const comboId = `combo-${type}`;
      if (!graph.findById(comboId)) {
        graph.createCombo(
          {
            id: comboId,
            label: nodes[0].getModel().nodeTypeName as string,
            labelCfg: {
              style: {
                fontSize: 60,
                fontWeight: 500,
              },
            },
            type: 'circle',
            style: {
              stroke: nodes[0].getModel().color as string,
              fill: nodes[0].getModel().color as string,
              fillOpacity: 0.2,
            },
          },
          nodes.map((a) => a.getID())
        );
      }

      // Step 2.1: Move Nodes to Their Respective Combos
      nodes.forEach((node) => {
        graph.updateItem(node.getID(), { comboId: comboId });
      });
    });

    // Step 3: Calculate Combo Layout Positions
    const totalWidth = graph.getCombos().reduce((a, c) => a + c?.getBBox().width, 0);

    // Calculate the starting X position for the first combo
    let startX = -totalWidth / 2;

    // Position combos in a horizontal line
    graph.getCombos().forEach((comboId) => {
      const comboItem = graph.findById(comboId.getID());
      graph.updateItem(comboId, { x: startX + comboItem.getBBox().width / 2, y: 0 });
      startX += comboItem.getBBox().width + 20; // Update the starting X position for the next combo
    });

    // Apply layout to nodes within each combo in a grid layout with nodes close to each other
    graph.getCombos().forEach((comboId) => {
      const comboItem = graph.findById(comboId.getID());
      const comboBBox = comboItem.getBBox();

      // Get the nodes within the combo
      const nodesInCombo = comboId.getNodes();

      // Calculate the number of rows and columns based on the number of nodes
      const numRows = Math.ceil(Math.sqrt(nodesInCombo.length));
      const numCols = Math.ceil(nodesInCombo.length / numRows);

      // Adjust the width and height of each cell in the grid to bring nodes close
      const cellWidth = comboBBox.width / (numCols * 2.2); // Adjust this factor for spacing
      const cellHeight = comboBBox.height / (numRows * 2.2); // Adjust this factor for spacing

      // Initialize variables for tracking the current row and column
      let currentRow = 0;
      let currentCol = 0;

      nodesInCombo.forEach((node) => {
        // Calculate the position of the node within the grid with nodes close together
        const x = comboBBox.minX + currentCol * cellWidth + cellWidth / 2;
        const y = comboBBox.minY + currentRow * cellHeight + cellHeight / 2;

        graph.updateItem(node.getID(), { x, y });

        // Move to the next column or row
        currentCol++;
        if (currentCol >= numCols) {
          currentCol = 0;
          currentRow++;
        }
      });
    });

    clearCanvas(graph);

    graph.fitView();

    graph.fitCenter(true, {
      duration: 400,
      easing: 'easePolyIn',
    });
  }
};

export const removeCombos = (graph: Graph) => {
  const comboSelect = graph.getCombos().filter((c) => c.getID() !== 'combo-select');

  if (comboSelect.length) {
    comboSelect.forEach((combo) => {
      graph.uncombo(combo.getID() as string);
      graph.addBehaviors(['drag-node', 'create-edge'], 'default');
    });
  }

  clearCanvas(graph);

  graph.render();
};

export const clearCanvas = (graph: Graph) => {
  graph.setAutoPaint(false);
  graph.refreshPositions();
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node);
  });
  graph.getEdges().forEach(function (edge) {
    graph.clearItemStates(edge);
  });
  graph.paint();
  graph.setAutoPaint(true);
};
