import React, { CSSProperties, useState } from 'react';
import { CollapsePanelProps } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { COLORS } from '../../helpers/constants';
import { StyledCollapse } from './style';

const { Panel } = StyledCollapse;

interface Props {
  panels: Array<PropsPanel>;
  defaultActiveKey?: string | string[];
}

interface PropsPanel extends CollapsePanelProps {
  children: React.ReactNode;
}

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

export const PerspectiveCollapse = ({ panels, defaultActiveKey }: Props) => {
  const [activeKey, setKey] = useState('1');

  const onChange = (key: string | string[]) => {
    if (key.length) setKey(key[0]);
  };

  return (
    <StyledCollapse
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
    </StyledCollapse>
  );
};
