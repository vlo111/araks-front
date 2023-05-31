import { Text } from 'components/typography';
import { ReactComponent as AddSvg } from './content/icons/add.svg';
import { ReactComponent as DuplicateSvg } from './content/icons/duplicate.svg';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Tooltip } from 'components/tool-tip';
import React from 'react';

type Props = React.FC<{ setIsNewPerspective: React.Dispatch<React.SetStateAction<boolean>> }>;

const centerStyle = { display: 'flex', alignItems: 'center' };

const Wrapper = styled.div`
  .action {
    cursor: pointer;

    &:hover {
      svg {
        border-radius: 50%;
        background: #232f6a;

        path {
          fill: white;
        }
      }
    }
  }
`;

export const Header: Props = ({ setIsNewPerspective }) => {
  return (
    <Wrapper>
      <Row style={{ width: '100%' }} gutter={12}>
        <Col offset={1} style={centerStyle}>
          <Text style={{ fontSize: '20px' }}>Perspectives</Text>
        </Col>
        <Col style={centerStyle} className="action">
          <Tooltip title="Add Perspective">
            <AddSvg onClick={() => setIsNewPerspective(true)} />
          </Tooltip>
        </Col>
        <Col style={centerStyle} className="action">
          <Tooltip title="Duplicate">
            <DuplicateSvg />
          </Tooltip>
        </Col>
      </Row>
    </Wrapper>
  );
};
