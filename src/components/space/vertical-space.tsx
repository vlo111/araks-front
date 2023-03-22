import { Space, SpaceProps } from 'antd';

export const VerticalSpace = ({ children, size = 'middle', style = { width: '100%' }, ...rest }: SpaceProps) => (
  <Space direction="vertical" size={size} style={style} {...rest}>
    {children}
  </Space>
);
