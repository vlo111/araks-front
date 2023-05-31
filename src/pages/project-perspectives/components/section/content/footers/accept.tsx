import { Col, Row, Space } from 'antd';
import { Wrapper } from './wrapper';

export const Accept = () => {
  return (
    <Wrapper>
      <Row gutter={30}>
        <Col className="box" span={24}>
          <Space className="text accept" align={'center'}>
            Accept
          </Space>
        </Col>
      </Row>
    </Wrapper>
  );
};
