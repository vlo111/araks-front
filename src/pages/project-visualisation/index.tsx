import { Graph } from './components/graph'
import { LeftSection } from './components/left-section';;
import { useNodes } from 'hooks/use-nodes';
import { NodeView } from './components/drawers/nodes/node-view';
import { NodeCreate } from './components/drawers/nodes/add-node';
import { Settings } from './components/settings';
import { NodeDelete } from './components/modals/delete-node';
import { EdgeCreate } from './components/drawers/edges/add-edge';
import { EdgeDelete } from './components/modals/delete-edge';
import {EdgeView} from "./components/drawers/edges/edge-view";

export const ProjectVisualisation = () => {
  useNodes();

  return (
    <div style={{ overflow: 'hidden' }}>
      <Graph />
      <LeftSection/>
      <Settings />
      <NodeCreate />
      <NodeView />
      <NodeDelete />
      <EdgeDelete />
      <EdgeCreate />
      <EdgeView />
    </div>
  );
};
