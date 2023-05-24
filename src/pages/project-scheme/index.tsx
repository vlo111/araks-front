import { Space } from 'antd';
import { Topology } from './components/topology';
import { ActionBar } from './components/action-bar';
import { Schema } from './components/schema';
import { Toolbar } from '../../components/tool-bar';

export const ProjectScheme = () => (
  <Space>
    <Topology />
    <Schema />
    <ActionBar />
    <Toolbar position="right" />
  </Space>
);
