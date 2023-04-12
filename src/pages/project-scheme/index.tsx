import { Space } from 'antd';
import { Topology } from './components/topology';
import { Toolbar } from './components/bars/tool-bar/wrapper';
import { ActionBar } from './components/bars/action-bar';
import { Schema } from './components/schema';

export const ProjectScheme = () => (
  <Space>
    <Topology />
    <Schema />
    <ActionBar />
    <Toolbar />
  </Space>
);
