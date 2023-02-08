import { Space } from 'antd';

const VerticalSpace = ({ children, size = 'middle', style = { width: '100%' }, ...rest }) => (
  <Space direction="vertical" size={size} style={style} {...rest}>
    {children}
  </Space>
);

export default VerticalSpace;
