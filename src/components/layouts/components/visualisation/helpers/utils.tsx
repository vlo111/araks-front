import client from 'api/client';
import { GetNeo4jData } from 'api/visualisation/use-get-data';
import { AddEdges, CalcExpandList, Edge, ExpandList, ExpandListData, GroupAndCountResult, GroupedData } from '../types';
import { renderTooltipModal } from './tooltip';
import { Graph, IEdge, IGraph, INode, Item } from '@antv/g6';
import { allSvg, inSvg, outSvg } from './svgs';
import { formattedData } from './format-node';
import { PATHS } from 'helpers/constants';
import { initConnector } from '../container/initial/nodes';
import { edgeLabelCfgStyle, nodeLabelCfgStyle } from './constants';

export const getExpandData = async (id: string, label: string, direction: string) => {
  const projectId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  const url = `${process.env.REACT_APP_BASE_URL}${
    location.pathname.startsWith(PATHS.PUBLIC_PREFIX) ? 'public/' : ''
  }neo4j/expand/${projectId}`;

  const params: { params: { id: string; direction?: string; label?: string } } = {
    params: {
      id,
    },
  };

  if (label) {
    params.params.label = label;
    params.params.direction = direction;
  } else {
    params.params.direction = 'all';
  }

  const data: GetNeo4jData = await client.get(url, params);

  return data.data;
};

export const getExpandList = async (id: string) => {
  const expandList: ExpandListData | null = await client.get(
    `${process.env.REACT_APP_BASE_URL}${
      location.pathname.startsWith(PATHS.PUBLIC_PREFIX) ? 'public/' : ''
    }neo4j/expand-list/${location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}`,
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
export const getMenuContexts = (id: string, isNode: boolean, isEdit: boolean, showShortestPath: boolean) => {
  const nodeContext = `<div class='menu'>
      <span class='focus'>Focus on node</span>
      <span class="main-menu expand">Expand</span>
      <div class='menu submenu-container'>
        <div class='submenu'>
        </div>
      </div>
      ${showShortestPath ? "<span class='shortest-path'>Shortest path</span>" : ''}
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
            <div class="hidden">${l.name} ${l.direction}</div>
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

export const expandByNodeData = async (
  graph: Graph,
  item: Item,
  nodeId: string,
  label: string,
  direction: string,
  setGraphInfo: (info: { nodeCount?: number | undefined; nodeCountAPI?: number | undefined }) => void
) => {
  const expandData = await getExpandData(nodeId, label, direction);

  const graphData = formattedData(expandData.nodes, expandData.edges, expandData.relationsCounts);

  const radius = 200;

  graphData.nodes.forEach((n, index) => {
    graph.addItem('node', {
      ...n,
      labelCfg: nodeLabelCfgStyle,
      x: (item?._cfg?.model?.x ?? 0) + radius * Math.sin((Math.PI * 2 * index) / graphData.nodes.length),
      y: (item?._cfg?.model?.y ?? 0) - radius * Math.cos((Math.PI * 2 * index) / graphData.nodes.length),
    });
  });

  graphData.edges.forEach((e) => {
    graph.addItem('edge', {
      ...e,
      labelCfg: edgeLabelCfgStyle,
    });
  });

  updateConnector(graph);

  setGraphInfo({
    nodeCount: graph.getNodes().length,
  });
};

export const expand = async (
  graph: Graph,
  item: Item,
  target: HTMLElement,
  setGraphInfo: (info: { nodeCount?: number | undefined; nodeCountAPI?: number | undefined }) => void
) => {
  const textContent = target.closest('.row')?.firstElementChild?.textContent?.trim();

  const [label, direction] = textContent?.split(' ') ?? [];

  const nodeId = (item._cfg?.model as { id: string })?.id ?? '';

  await expandByNodeData(graph, item, nodeId, label, direction, setGraphInfo);
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
        graph.updateItem(node.getID(), {
          comboId: comboId,
          style: {
            fill: node.getModel().img ? 'transparent' : 'white',
          },
        });
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
    });
  }

  clearCanvas(graph);

  graph.updateLayout(
    {
      type: 'gForce',
      center: [window.innerWidth / 2, window.innerHeight / 2],
      linkDistance: 100,
      nodeStrength: 600,
      edgeStrength: 200,
      nodeSize: 5,
      workerEnabled: true,
      gpuEnabled: true,
      fitView: true, // Fit the view to the entire graph
      fitViewPadding: [30, 30], // Padding around the graph when fitting the view
    },
    'center',
    { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    true
  );
  setTimeout(() => {
    graph.fitCenter(true);

    graph.fitView([30, 30], { ratioRule: 'min', direction: 'both', onlyOutOfViewPort: true }, true);
  }, 500);
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
  graph.getCombos().forEach(function (combo) {
    graph.clearItemStates(combo);
  });
  graph.paint();
  graph.setAutoPaint(true);
};

export const removeFakeEdge = (graph: IGraph) => {
  const edges = graph.getEdges();
  const fake_edge: IEdge[] | undefined = edges?.filter((e) => e.getID().includes('edge-'));
  if (fake_edge?.length) fake_edge.forEach((edge) => graph.removeItem(edge?.getID()));
};

export const addEdges: AddEdges = (graph, nodeId, edges) => {
  edges?.forEach(({ source_id: source, target_id: target, ...edge }) => {
    graph.addItem('edge', {
      source,
      target,
      type: source === nodeId && target === nodeId ? 'loop' : 'quadratic',
      ...edge,
      labelCfg: edgeLabelCfgStyle,
    });
  });
};

export const updateConnector = (graph: Graph) => {
  const edges = graph.save().edges as Edge[];

  initConnector(edges);

  graph.getEdges().forEach((edge, i) => {
    graph.updateItem(edge, {
      curveOffset: edges[i].curveOffset,
      curvePosition: edges[i].curvePosition,
    });
  });
};

export const graphRender = (graph: Graph) => {
  if (!graph || typeof graph.render !== 'function') {
    return;
  }

  graph.destroyLayout();

  graph.render();

  graph.fitCenter();
  graph.fitView([20, 20], { ratioRule: 'max', direction: 'both', onlyOutOfViewPort: true });

  setTimeout(() => {
    graph.updateLayout(
      {
        type: 'gForce',
        center: [window.innerWidth, window.innerHeight],
        linkDistance: 100,
        nodeStrength: 600,
        edgeStrength: 200,
        nodeSize: 20,
        workerEnabled: true,
        gpuEnabled: true,
        fitCenter: true,
        fitView: true, // Fit the view to the entire graph
        fitViewPadding: [10, 10], // Padding around the graph when fitting the view
      },
      'center',
      { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      true
    );
  }, 400);

  setTimeout(() => {
    updateItemsLabelName(graph);
  }, 1000);
};

const updateItemsLabelName = (graph: Graph) => {
  graph.getNodes().map((n) => {
    graph.updateItem(n.getID(), {
      labelCfg: nodeLabelCfgStyle,
      style: {
        stroke: n.getModel()?.color as string,
        fill: n.getModel()?.img ? 'transparent' : 'white',
      },
    });
  });

  graph.getEdges().map((n) => {
    graph.update(n, {
      labelCfg: edgeLabelCfgStyle,
    });
  });
};
