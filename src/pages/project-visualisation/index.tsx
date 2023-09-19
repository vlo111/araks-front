import { Graph } from './components/graph';
import { LeftSection } from './left-section';
import { NodeCreateDrawer } from './components/drawers/nodes/create-node';
import { Settings } from './components/settings';
import { NodeDeleteModal } from './components/modals/delete-node';
import { EdgeCreateDrawer } from './components/drawers/edges/add-edge';
import { EdgeDeleteModal } from './components/modals/delete-edge';
import { EdgeViewDrawer } from './components/drawers/edges/edge-view';
import { ToolbarVisualization } from '../../components/tool-bar';
import { ViewEditNodeDrawer } from './components/drawers/nodes/view-edit-node';
import { SearchData } from './components/search/canvas';
import { ShortestPathModal } from './components/modals/shortest-path';
import { GraphInfo } from './components/info';

export const ProjectVisualisation = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Graph />
      <SearchData />
      <ToolbarVisualization />
      <LeftSection />
      <Settings />
      <NodeCreateDrawer />
      <ViewEditNodeDrawer />
      <NodeDeleteModal />
      <ShortestPathModal />
      <EdgeDeleteModal />
      <EdgeCreateDrawer />
      <EdgeViewDrawer />
      <GraphInfo />
    </div>
  );
};
