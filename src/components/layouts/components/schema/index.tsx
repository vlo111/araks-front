import { SchemaProvider } from './provider';
import { TopologyPanel } from './topology-panel';
import { Tools } from './tools';
import { ToolbarWrapper } from "./tool-bar/wrapper";

export const SchemaWrapper = () => (
  <SchemaProvider>
    <TopologyPanel />
    <Tools />
    <ToolbarWrapper />
  </SchemaProvider>
);
