import { ReactNode, CSSProperties } from 'react';
import { Drawer as DrawerWrapper } from 'antd';
import './perspective-drawer-style.css';
export const maskStyle: CSSProperties = {
  background: 'linear-gradient(119.84deg, rgba(203, 203, 203, 0.5) 88.78%, rgba(255, 255, 255, 0.49) 165.43%)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(2px)',
};

export const contentStyle: CSSProperties = {
  width: '40rem',
  border: '1px solid #FFFFFF',
  boxShadow: '0px 10px 10px rgba(141, 143, 166, 0.2)',
};

export const drawerStyle: CSSProperties = {
  background: 'linear-gradient(122.32deg, rgba(237, 239, 248, 0.9) 3.09%, rgba(237, 239, 248, 0.4) 99.26%)',
  border: '1px solid #FFFFFF',
  boxShadow: '0px 10px 10px rgba(141, 143, 166, 0.2)',
  backdropFilter: 'blur(7px)',
  borderRadius: '4px',
};

export const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export const Drawer = ({
  children,
  ...props
}: Partial<{ children: ReactNode; onClose: () => void; open: boolean, footer: ReactNode }>) => {
  return (
    <DrawerWrapper
      title="Share"
      placement="right"
      rootClassName="perspective-drawer"
      getContainer={false}
      bodyStyle={bodyStyle}
      maskStyle={maskStyle}
      drawerStyle={drawerStyle}
      contentWrapperStyle={contentStyle}
      {...props}
    >
      {children}
    </DrawerWrapper>
  );
};
