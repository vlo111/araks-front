import { Text } from 'components/typography';
import { ReactComponent as AddSvg } from './collapse/icons/add.svg';
import { ReactComponent as DuplicateSvg } from './collapse/icons/duplicate.svg';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Tooltip } from 'components/tool-tip';

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

export const Header = () => {
  return (
    <Wrapper>
      <Row style={{ width: '100%' }} gutter={12}>
        <Col offset={1} style={centerStyle}>
          <Text style={{ fontSize: '20px' }}>Perspectives</Text>
        </Col>
        <Col style={centerStyle} className="action">
          <Tooltip title="Add Perspective">
            <AddSvg />
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
