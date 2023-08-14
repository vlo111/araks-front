import { Col, Row, Space } from 'antd';
import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ISharedPerspectiveData } from 'api/types';
import React from 'react';
import { InfoSection } from './sections';

type Props = React.FC<{ id: string; description: string; shared: ISharedPerspectiveData[] }>;

const Wrapper = styled.div`
  .box {
    margin-left: -1px;
    background: rgba(35, 47, 106, 0.3);
    height: 40px;
    border-radius: 0 0 4px 4px;
    padding: 0 !important;

    .text {
      display: flex;
      cursor: default;
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

    &.disable {
      background: #999db64f;
      .text {
        color: #858aa4a3;
      }
    }

    &:not(.disable) {
      .text {
        cursor: pointer;
      }

      &:hover {
        background: #232f6a;
        .text {
          color: #ffffff;
        }
      }
    }
  }
`;

export const FooterPanel: Props = ({ id, description, shared }) => {
  const { perspective, startPerspectiveShare, perspective_info } = useSchema() || {};

  const share = () => startPerspectiveShare({ id, openShare: !(perspective?.openShare ?? false), sharedUsers: shared });

  const ColDisabledShare = (
    <Col className="box disable" span={12} style={{ marginLeft: '1px' }}>
      <Space className="text" align={'center'}>
        Share <p>({shared.length})</p>
      </Space>
    </Col>
  );

  const ColActiveShare = (
    <Col className="box" span={12} style={{ marginLeft: '1px' }}>
      <Space className="text" align={'center'} onClick={share}>
        Share <p>({shared.length})</p>
      </Space>
    </Col>
  );

  return (
    <>
      <InfoSection />
      <span>{description}</span>
      <Wrapper>
        <Row gutter={30}>
          <Col className="box" span={12}>
            <Space className="text" align={'center'}>
              Visualization
            </Space>
          </Col>
          {perspective_info?.typesLength ? ColActiveShare : ColDisabledShare}
        </Row>
      </Wrapper>
    </>
  );
};
