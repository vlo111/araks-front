import { Col, Drawer, Form, Row, Select } from 'antd';
import { containerStyle, contentStyle, drawerStyle, maskStyle } from './style';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Input } from 'components/input';
import { textStyles } from 'components/typography';
import { CaretDownFilled } from '@ant-design/icons';
import styled from 'styled-components';

const ShareSelect = styled(Select)`
  && {
    .ant-select-selector {
      background-color: #ededf3;

      .ant-select-selection-item {
        ${textStyles};
        padding: 3px 16px;
      }

      &:active {
        box-shadow: none;
      }
    }

    &&.ant-select-focused .ant-select-selector {
      box-shadow: none;
    }
  }
`;

export const SHARE_OPTIONS = [
  {
    label: 'Can Edit',
    value: 'edit',
  },
  {
    label: 'Can View',
    value: 'view',
  },
];

export const Share = () => {
  const { perspective, startPerspectiveShare } = useSchema() || {};

  const onClose = () => {
    startPerspectiveShare({ openShare: false, sharedUsers: [] });
  };

  const [form] = Form.useForm();

  const onFinish = () => {
    // mutate(values);
  };

  const list = SHARE_OPTIONS;

  return (
    <>
      <div style={{ ...containerStyle, visibility: perspective?.openShare ? 'inherit' : 'hidden' }}>
        <Drawer
          title="Share"
          placement="right"
          onClose={onClose}
          open={perspective?.openShare ?? false}
          getContainer={false}
          contentWrapperStyle={contentStyle}
          drawerStyle={drawerStyle}
          maskStyle={maskStyle}
        >
          <Form
            name="share-perspective"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            <Row>
              <Col span={24}>
                <Input placeholder="Main" />
              </Col>
              <Col span={24} style={{ position: 'absolute', right: '50px' }}>
                <ShareSelect
                  value={list[0]}
                  popupClassName="share-dropdown"
                  style={{ width: 156 }}
                  // onChange={handleOnChange}
                  options={list}
                  suffixIcon={<CaretDownFilled />}
                />
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    </>
  );
};
