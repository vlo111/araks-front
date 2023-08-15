import { Graph } from './components/graph';
import { useNodes } from 'hooks/use-nodes';
import { NodeView } from './components/drawers/node-view';
import { NodeCreate } from './components/drawers/add-node';
import { Settings } from './components/settings';
import { NodeDelete } from './components/modals/delete-node';

export const ProjectVisualisation = () => {
  useNodes();

  return (
    <div style={{ overflow: 'hidden' }}>
      <Graph />
      <Settings />
      <NodeCreate />
      <NodeView />
      <NodeDelete />
    </div>
  );
};
