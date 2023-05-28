import { Col, Row, Space } from 'antd';

export const Footer = () => {
  const colStyle = {
    marginLeft: '-1px',
    background: 'rgba(35, 47, 106, 0.3)',
    height: '40px',
    borderRadius: '0px 0px 4px 4px',
  };

  const spaceStyle = {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    height: '100%',
    fontWeight: '700',
    letterSpacing: '0.07em',
    textDecorationLine: 'underline',
    color: '#232F6A',
  };

  return (
    <Row gutter={30}>
      <Col span={12} style={colStyle}>
        <Space align={'center'} style={spaceStyle}>
          Visualization
        </Space>
      </Col>
      <Col span={12} style={{ ...colStyle, marginLeft: '1px' }}>
        <Space align={'center'} style={spaceStyle}>
          Share
        </Space>
      </Col>
    </Row>
  );
};
