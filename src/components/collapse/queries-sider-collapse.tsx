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

export const QueriesSiderCollapse = ({ panels, defaultActiveKey }: Props) => {
  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ color: COLORS.PRIMARY.GRAY }} />
      )}
      style={{ background: 'transparent', margin: '0', height: '100%' }}
      bordered={false}
      defaultActiveKey={defaultActiveKey}
    >
      {panels.map((panelProps) => (
        // eslint-disable-next-line react/jsx-key
        <Panel {...panelProps} />
      ))}
    </Collapse>
  );
};
