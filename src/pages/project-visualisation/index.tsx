import { Graph } from './components/graph';
import { useNodes } from 'hooks/use-nodes';
import { NodeView } from './components/node-view';

export const ProjectVisualisation = () => {
  useNodes();

  return (
    <div style={{ overflow: "hidden"}}>
      <Graph />
      <NodeView />
    </div>
  );
};
