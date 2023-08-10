import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Drawer, Form, Radio, Row, Space } from 'antd';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { VerticalSpace } from 'components/space/vertical-space';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { useOverview } from 'context/overview-context';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonWithIcon } from '.';

const StyledRadioButton = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    border: none;

    &.ant-radio-button-wrapper-checked {
      border-radius: 4px;
      background: #232f6a;
      padding: 4px 16px 4px 8px;
    }
  }

  .ant-radio-button-wrapper:nth-child(2)::before {
    content: none;
  }
`;

export const QueriesButton = () => {
  const [openTable, setOpenTable] = useState(false);
  const { hideLeftSection, setHideLeftSection } = useOverview();
  const [form] = Form.useForm();

  const onClose = () => {
    setHideLeftSection(false);
    form.resetFields();
  };

  const onFinish = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Form
      name="all-data-query-filter"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      scrollToFirstError
    >
      <Drawer
        className="queries-filter-drawer"
        headerStyle={{ background: '#F2F2F2', padding: '12px 16px 12px 12px' }}
        title={
          <Row justify="space-between">
            <Col span={6}>
              <Space>
                <CaretRightOutlined onClick={onClose} style={{ fontSize: '32px' }} />
                Queries
              </Space>
            </Col>
            <Col span={8}>
              <Space>
                <UsefulInformationTooltip infoText="Inherit parent options" />
                <Form.Item name="switchField" noStyle initialValue={'and'}>
                  <StyledRadioButton
                    size="small"
                    options={[
                      { label: 'And', value: 'and' },
                      { label: 'Or', value: 'or' },
                    ]}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </Form.Item>
              </Space>
            </Col>
          </Row>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        open={hideLeftSection}
        mask={false}
        getContainer={false}
        afterOpenChange={(open) => {
          if (!open) {
            setHideLeftSection(false);
          }
        }}
        width="100%"
        contentWrapperStyle={{ height: '100%', overflowY: 'auto' }}
        footerStyle={{ zIndex: 3, background: '#F2F2F2' }}
        bodyStyle={{ background: '#F2F2F2', paddingLeft: '0', paddingRight: '0' }}
        footer={
          <VerticalSpace>
            <Row gutter={16} justify="center">
              <Col span={20}>
                <ButtonWithIcon onClick={() => setOpenTable(true)} block icon={<PlusOutlined />}>
                  Add
                </ButtonWithIcon>
              </Col>
            </Row>
            <Row gutter={32} justify="center">
              <Col span={10}>
                <Button style={{ marginRight: 8 }} onClick={() => form.resetFields()} block>
                  Claen All
                </Button>
              </Col>
              <Col span={10}>
                <Button type="primary" htmlType="submit" block>
                  Run Search
                </Button>
              </Col>
            </Row>
          </VerticalSpace>
        }
      >
        <QueriesForm openTable={openTable} setOpenTable={setOpenTable} />
      </Drawer>
    </Form>
  );
};
