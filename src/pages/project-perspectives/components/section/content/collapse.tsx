import { PerspectiveCollapse } from 'components/collapse/perspective-collapse';
import React from 'react';
import { CollapsePanelProps, Space } from 'antd';

interface PropsPanel extends CollapsePanelProps {
  children: React.ReactNode;
}

type Props = React.FC<{ panels: Array<PropsPanel>; isNewPerspective: boolean }>;

export const Content: Props = ({ panels, isNewPerspective }) => {
  return (
    <Space>
      <PerspectiveCollapse defaultActiveKey="1" panels={panels} isNewPerspective={isNewPerspective} />
    </Space>
  );
};
