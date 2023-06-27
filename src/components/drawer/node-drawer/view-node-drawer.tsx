import { CSSProperties } from 'react';
import { Drawer as DrawerWrapper, DrawerProps } from 'antd';
import './view-node-drawer-style.css';

export const maskStyle: CSSProperties = {
  background: 'linear-gradient(119.84deg, rgba(203, 203, 203, 0.5) 88.78%, rgba(255, 255, 255, 0.49) 165.43%)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(2px)',
};

export const drawerStyle: CSSProperties = {
  background: '#F2F2F2',
};

export const Drawer = ({ children, ...props }: Partial<DrawerProps>) => {
  return (
    <DrawerWrapper
      title="Add Node"
      width={600}
      placement="right"
      rootClassName="add-node-drawer"
      getContainer={false}
      maskStyle={maskStyle}
      drawerStyle={drawerStyle}
      {...props}
    >
      {children}
    </DrawerWrapper>
  );
};
