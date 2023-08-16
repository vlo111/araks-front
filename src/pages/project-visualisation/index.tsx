import { Graph } from './components/graph';
import { useNodes } from 'hooks/use-nodes';
import { NodeView } from './components/drawers/nodes/node-view';
import { NodeCreate } from './components/drawers/nodes/add-node';
import { Settings } from './components/settings';
import { NodeDelete } from './components/modals/delete-node';
import { EdgeCreate } from './components/drawers/edges/add-edge';

export const ProjectVisualisation = () => {
  useNodes();

  return (
    <div style={{ overflow: 'hidden' }}>
      <Graph />
      <Settings />
      <NodeCreate />
      <NodeView />
      <NodeDelete />
      <EdgeCreate />
    </div>
  );
};
