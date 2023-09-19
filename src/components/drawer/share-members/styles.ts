import { CSSProperties } from 'react';
import { getElement } from './utils';
import styled from 'styled-components';

export const contentStyle: CSSProperties = {
  position: 'fixed',
  boxShadow: 'none',
  right: 0,
};

export const drawerStyle: CSSProperties = {
  background: '#f2f2f2',
  border: 'none',
  boxShadow: 'none',
};

export const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export const LabelName = styled.span`
  color: #c5c5c5;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.12px;
`;

export const drawerPosition = () => ({
  width: window.innerWidth - (getElement('.project-save')?.clientWidth as number),
  top:
    (getElement('.ant-layout-header')?.clientHeight as number) + (getElement('.ant-tabs-nav')?.clientHeight as number),
});
