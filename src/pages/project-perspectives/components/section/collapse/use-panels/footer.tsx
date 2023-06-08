import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { useSchema } from "components/layouts/components/schema/wrapper";

const Wrapper = styled.div`
  .box {
    margin-left: -1px;
    background: rgba(35, 47, 106, 0.3);
    height: 40px;
    border-radius: 0 0 4px 4px;
    padding: 0 !important;

    &:hover {
      background: #232f6a;

      .text {
        color: #ffffff;
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

      &.accept {
        box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);

        &:hover {
          box-shadow: inset 0 4px 4px rgb(153 157 182);
        }
      }
    }
  }
`;

export const FooterPanel = ({ description, shared }: { description: string, shared: number }) => {
  const { perspective, startPerspectiveShare } = useSchema() || {};

  return (
    <>
      <span>{description}</span>
      <Wrapper>
        <Row gutter={30}>
          <Col className="box" span={12}>
            <Space className="text" align={'center'}>
              Visualization
            </Space>
          </Col>
          <Col className="box" span={12} style={{ marginLeft: '1px' }}>
            <Space className="text" align={'center'} onClick={() => startPerspectiveShare({ openShare: !(perspective?.openShare ?? false) })}>
              Share <p>({shared})</p>
            </Space>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};
