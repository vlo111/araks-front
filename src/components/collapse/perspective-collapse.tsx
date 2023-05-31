import React, { CSSProperties, useEffect, useState } from 'react';
import { Collapse, CollapsePanelProps } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { COLORS } from '../../helpers/constants';

const { Panel } = Collapse;

interface Props {
  panels: Array<PropsPanel>;
  defaultActiveKey?: string | string[];
  isNewPerspective: boolean;
}

interface PropsPanel extends CollapsePanelProps {
  children: React.ReactNode;
}

export const PerspectiveCollapse = ({ panels, defaultActiveKey, isNewPerspective }: Props) => {
  const panelStyle = {
    marginBottom: 8,
    background: '#CBCDD9',
    borderRadius: 1,
    border: 'none',
  };

  const collapseStyle: CSSProperties = {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#f4f5fb',
    color: COLORS.PRIMARY.BLUE,
  };

  const [activeKey, setKey] = useState('1');

  const onChange = (key: string | string[]) => {
    if (key.length && activeKey !== 'add') setKey(key[0]);
  };

  useEffect(() => {
    if (isNewPerspective) {
      setKey('add');
    } else {
      setKey('1');
    }
  }, [isNewPerspective]);

  return (
    <Collapse
      accordion
      onChange={onChange}
      bordered={false}
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      expandIcon={() => <CaretRightOutlined rotate={180} />}
      style={collapseStyle}
    >
      {panels.map(({ key, ...panelProps }) => (
        <Panel key={key} showArrow={activeKey === key} style={panelStyle} {...panelProps} />
      ))}
    </Collapse>
  );
};
