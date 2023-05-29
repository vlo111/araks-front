import { Col, Row, Space } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  .box {
    margin-left: -1px;
    background: rgba(35, 47, 106, 0.3);
    height: 40px;
    border-radius: 0 0 4px 4px;
    
    &:hover {
      background: #232F6A;

      .text {
        color: #FFFFFF;
      }
    }

    .text {
      display: flex;
      cursor: pointer;
      justify-content: center;
      height: 100%;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-decoration-line: underline;
      color: #232f6a;
    }
  }
`;

export const Footer = () => {
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
