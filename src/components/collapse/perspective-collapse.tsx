import React, { CSSProperties } from 'react';
import { CollapsePanelProps } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { StyledCollapse } from './style';

const { Panel } = StyledCollapse;

interface Props {
  panels: Array<PropsPanel>;
  defaultActiveKey?: string | string[];
  activeKey: string,
  onChange: (key: string | string[]) => void,
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
  alignItems: 'center',
  backgroundColor: '#f4f5fb',
  color: COLORS.PRIMARY.BLUE,
};

export const PerspectiveCollapse = ({ ...props }: Props) => {

  return (
    <StyledCollapse
      accordion
      bordered={false}
      expandIcon={() => <CaretRightOutlined rotate={180} />}
      style={collapseStyle}
      {...props}
    >
      {props.panels.map(({ key, ...panelProps }) => (
        <Panel key={key} showArrow={props.activeKey === key} style={panelStyle} {...panelProps} />
      ))}
    </StyledCollapse>
  );
};
