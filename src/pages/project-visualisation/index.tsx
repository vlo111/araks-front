import { Spin } from 'antd';
import { Graph } from './components/graph';
import { useNodes } from 'hooks/use-nodes';
import { NodeRender } from './components/node-render';

export const ProjectVisualisation = () => {
  const { isInitialLoading } = useNodes();

  return (
    <Spin style={{ top: '40vh' }} spinning={isInitialLoading}>
      <Graph />
      <NodeRender />
    </Spin>
  );
};
