import { PerspectiveWrapper } from './style';
import { Col, CollapsePanelProps, Form, Row } from "antd";
import { FormItem } from 'components/form/form-item';
import { FormInput } from 'components/input';
import { rulesInput } from 'components/profile/edit/utils';
import { Text } from "../../../components/typography";
import { Tooltip } from "../../../components/tool-tip";
import { ReactComponent as AddSvg } from "../components/section/content/icons/add.svg";
import { ReactComponent as DuplicateSvg } from "../components/section/content/icons/duplicate.svg";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { PanelDescription, PanelHeader } from "../components/section/content/add-panel";
import { list } from "../components/section/fake-data";

interface PropsPanel extends CollapsePanelProps {
  children: React.ReactNode;
}

const centerStyle = { display: 'flex', alignItems: 'center' };

const Header = styled.div`
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

export const Perspectives = () => {
  const [form] = Form.useForm();

  const [isNewPerspective, setIsNewPerspective] = useState<boolean>(false);

  const addPanel = {
    header: <PanelHeader />,
    className: 'add-panel',
    key: 'add',
    children: <PanelDescription setIsNewPerspective={(item) => setIsNewPerspective(false)} />,
  };

  const [panels, setPanels] = useState<PropsPanel[]>(list);

  useEffect(() => {
    setPanels(!isNewPerspective ? list : [...list, addPanel]);
    /* eslint-disable */
  }, [isNewPerspective]);

  return (
    <PerspectiveWrapper>
      <Header>
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
      </Header>
      <Form
        name="project-perspective"
        form={form}
        // onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <FormItem name="name" label="Property name" rules={rulesInput}>
          <FormInput placeholder="Property name" />
        </FormItem>
      </Form>
    </PerspectiveWrapper>
  );
};
