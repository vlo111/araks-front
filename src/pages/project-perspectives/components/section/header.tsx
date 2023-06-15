import { Text } from 'components/typography';
import { ReactComponent as AddSvg } from './collapse/icons/add.svg';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Tooltip } from 'components/tool-tip';
import { EditPerspectiveModal } from './collapse/modals/edit-perspective';
import { useState } from 'react';

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
  const [openModal, setOpenModal] = useState(false);

  return (
    <Wrapper>
      <Row style={{ width: '100%' }} gutter={12}>
        <Col offset={1} style={centerStyle}>
          <Text style={{ fontSize: '20px' }}>Perspectives</Text>
        </Col>
        <Col style={centerStyle} className="action">
          <Tooltip title="Add Perspective">
            <AddSvg onClick={() => setOpenModal(true)} />
          </Tooltip>
        </Col>
      </Row>
      {openModal && <EditPerspectiveModal open={openModal} onCancel={() => setOpenModal(false)} />}
    </Wrapper>
  );
};
