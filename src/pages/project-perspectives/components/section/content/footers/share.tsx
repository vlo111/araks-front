import { Col, Row, Space } from 'antd';
import { Wrapper } from './wrapper';

export const Share = () => {
  return (
    <Wrapper>
      <Row gutter={30}>
        <Col className="box" span={12}>
          <Space className="text" align={'center'}>
            Visualization
          </Space>
        </Col>
        <Col className="box" span={12} style={{ marginLeft: '1px' }}>
          <Space className="text" align={'center'}>
            Share
          </Space>
        </Col>
      </Row>
    </Wrapper>
  );
};
