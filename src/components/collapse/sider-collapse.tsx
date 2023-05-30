import { Collapse, CollapsePanelProps } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';

const { Panel } = Collapse;

interface Props {
  panels: Array<PropsPanel>;
  defaultActiveKey?: string | string[];
}

interface PropsPanel extends CollapsePanelProps {
  children: React.ReactNode;
}

export const SiderCollapse = ({ panels, defaultActiveKey }: Props) => {
  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ color: COLORS.PRIMARY.GRAY }} />
      )}
      style={{ background: 'transparent', margin: '0 16px', maxHeight: '10vh' }}
      bordered={false}
      defaultActiveKey={defaultActiveKey}
    >
      {panels.map((panelProps) => (
        // eslint-disable-next-line react/jsx-key
        <Panel {...panelProps} style={{ maxHeight: '30vh', overflowY: 'auto' }} />
      ))}
    </Collapse>
  );
};
