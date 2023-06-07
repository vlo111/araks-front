import { PerspectiveCollapse } from 'components/collapse/perspective-collapse';
import React from 'react';
import { CollapsePanelProps } from 'antd';
import styled from 'styled-components';
import { COLORS } from 'helpers/constants';

interface PropsPanel extends CollapsePanelProps {
  children: React.ReactNode;
}

type Props = React.FC<{ panels: Array<PropsPanel> }>;

const background = `linear-gradient(122.32deg, rgba(237, 239, 248, 0.9) 3.09%, rgba(237, 239, 248, 0.4) 99.26%),
    linear-gradient(0deg, ${COLORS.PRIMARY.WHITE}, ${COLORS.PRIMARY.WHITE})`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: fixed;
  right: 0;
  top: 152px;
  width: 600px;
  height: 100%;
  padding-top: 24px;
  background: ${background};
  box-shadow: 0 10px 10px 0 #8d8fa633;
  border: 1px solid ${COLORS.PRIMARY.WHITE};
  z-index: 1;
`;

export const Content: Props = ({ panels }) => (
  <Wrapper>
    <PerspectiveCollapse defaultActiveKey="1" panels={panels} />
  </Wrapper>
);
