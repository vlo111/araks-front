import { Space } from 'antd';
import { TopologyWrapper } from './components/topology-panel';
import { ToolbarWrapper } from './components/bars/tool-bar/wrapper';
import { ActionBarWrapper } from './components/bars/action-bar';

export const ProjectScheme = () => {
  return (
    <Space>
      <TopologyWrapper />
      <ActionBarWrapper />
      <ToolbarWrapper />
    </Space>
  );
};
