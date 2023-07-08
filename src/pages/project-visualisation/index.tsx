import { Graph } from './components/graph';
import { useNodes } from 'hooks/use-nodes';
import { NodeView } from './components/drawers/node-view';
import { NodeEdit } from './components/drawers/add-node';
import { Settings } from './components/settings';

export const ProjectVisualisation = () => {
  useNodes();

  return (
    <div style={{ overflow: 'hidden' }}>
      <Graph />
      <Settings />
      <NodeView />
      <NodeEdit />
    </div>
  );
};
