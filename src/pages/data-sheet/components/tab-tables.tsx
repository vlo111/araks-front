import { ConnectionTypesSection } from './connection-types-section';
import { NodeTypesSection } from './node-types-section';

export const TabTables = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1 }}>
        <NodeTypesSection />
      </div>
      <div style={{ flex: 1 }}>
        <ConnectionTypesSection />
      </div>
    </div>
  );
};
