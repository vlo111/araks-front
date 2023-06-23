import { Graph } from './components/graph';
import { useNodes } from 'hooks/use-nodes';
import { NodeView } from './components/drawers/node-view';
import { NodeEdit } from './components/drawers/add-node';

export const ProjectVisualisation = () => {
  useNodes();

  return (
    <div style={{ overflow: 'hidden' }}>
      <Graph />
      <NodeView />
      <NodeEdit />
    </div>
  );
};
