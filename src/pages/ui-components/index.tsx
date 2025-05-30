import { Col, MenuProps, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Datepicker } from '../../components/datepicker';
import { Document } from '../../components/document';
import { Input } from '../../components/input';
import { ImageUrl } from '../../components/image-url';
import { VerticalSpace } from '../../components/space/vertical-space';
import { Url } from '../../components/url';
import {
  AddFolderButton,
  Button,
  ButtonWithIcon,
  CreateNewProjectButton,
  IconButton,
  LikeButton,
  SignUpButton,
} from '../../components/button';
import { Text, Title } from '../../components/typography';
import { Template } from '../../components/dropdown';
import { ProjectActionPopover } from '../../components/popover';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

export const UiComponents = () => {
  return (
    <VerticalSpace>
      <Typography.Title>Inputs</Typography.Title>
      <Row gutter={16}>
        <Col span={12}>
          <VerticalSpace>
            <Input placeholder="Text Here" />
            <Input placeholder="Text Here" disabled />
          </VerticalSpace>
        </Col>
        <Col span={12}>
          <Datepicker />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <VerticalSpace></VerticalSpace>
        </Col>
        <Col span={12}>
          <Document />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Url />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ImageUrl />
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <VerticalSpace>
            <Button block type="primary">
              BUTTON
            </Button>
            <Button block>BUTTON</Button>
            <ButtonWithIcon icon={<PlusOutlined />} block>
              BUTTON
            </ButtonWithIcon>
            <CreateNewProjectButton />
            <SignUpButton iconType="azure" block />
            <AddFolderButton block />
            <LikeButton block />
            <IconButton iconType="settings" />
          </VerticalSpace>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Title level={2}>Dropdown</Title>
      <Row gutter={16}>
        <Col span={12}>
          <VerticalSpace>
            <Template menu={items} />
          </VerticalSpace>
        </Col>
        <Col span={12}>
          <ProjectActionPopover content={content} title="Title">
            <Text>Hover me</Text>
          </ProjectActionPopover>
        </Col>
      </Row>
    </VerticalSpace>
  );
};
