import { useNodes } from 'hooks/use-nodes';
import { LeftSection } from './components/left-section';
import { Graph } from './components/graph';
import { Settings } from './components/settings';
import { NodeView } from './components/drawers/node-view';
import { NodeEdit } from './components/drawers/add-node';

export const ProjectVisualisation = () => {
  useNodes();


  return (
    <div style={{ overflow: 'hidden' }}>
      <LeftSection/>
      <Graph />
      <Settings />
      <NodeView />
      <NodeEdit />
    </div>
  );
};
