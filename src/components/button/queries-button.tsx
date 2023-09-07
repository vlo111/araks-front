import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Drawer, Form, Radio, Row, Space } from 'antd';
import { VisualizationSubmitType } from 'api/neo4j/types';
import { useQueriesVisualization } from 'api/neo4j/use-queries-visualization';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { getQueryFilterType, QueryFilterTypes } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { useOverview } from 'context/overview-context';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import { useCallback, useEffect, useState } from 'react';
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

type FormQueryValues = {
  operator: 'AND' | 'OR';
  queries: (
    | TreeNodeType
    | (TreeConnectionType & {
        type: QueryFilterTypes;
        typeText: string;
      })
  )[];
};

export const QueriesButton = () => {
  const [filter, setFilter] = useState<VisualizationSubmitType>({} as VisualizationSubmitType);
  const [openTable, setOpenTable] = useState(false);
  const [drawerContentHeight, setDrawerContentHeight] = useState('100%');

  const { hideLeftSection, setHideLeftSection } = useOverview();
  const [form] = Form.useForm();

  useQueriesVisualization(filter, { enabled: !!filter.queryArr?.length });

  const onClose = () => {
    setHideLeftSection(false);
    form.resetFields();
  };

  const clearFilter = useCallback(() => {
    setFilter({} as VisualizationSubmitType);
  }, []);

  const onFinish = (values: FormQueryValues) => {
    const queryArr = values.queries.map((query) => ({
      type: query.isConnectionType ? 'relation' : 'node',
      label: query.labelValue,
      ...((query.isConnectionType && query.depth !== 3) || (!query.isConnectionType && query.depth === 1)
        ? { action: getQueryFilterType(query.type) }
        : {}),
      ...(query.isConnectionType && query.depth !== 1 ? { project_edge_type_id: query.id } : {}),
      query:
        (query.isConnectionType && query.depth === 3) || (!query.isConnectionType && query.depth === 2)
          ? {
              [query.name]: {
                type: query.ref_property_type_id,
                action: getQueryFilterType(query.type),
                value:
                  query.type === QueryFilterTypes.BETWEEN ? [query.betweenStart, query.betweenEnd] : query.typeText,
              },
            }
          : {},
    }));

    const data = {
      operator: values.operator,
      queryArr: queryArr,
    } as VisualizationSubmitType;
    setFilter(data);
    // eslint-disable-next-line no-console
    console.log('data to submit', data);
  };

  useEffect(() => {
    const headerHeight = document.getElementById('overview-header')?.clientHeight;
    const headerTabsHeight = document.querySelector('#overview-header-tabs .ant-tabs-nav')?.clientHeight;

    // Calculate the content height and set it to state
    const contentHeight = `calc(100vh - ${headerHeight}px - ${headerTabsHeight}px - 20px)`;
    setDrawerContentHeight(contentHeight);
  }, []);

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
          <Row justify="space-around">
            <Col span={6}>
              <Space>Queries</Space>
            </Col>
            <Col span={8}>
              <Space>
                <UsefulInformationTooltip infoText="Inherit parent options" />
                <Form.Item name="operator" noStyle initialValue={'AND'}>
                  <StyledRadioButton
                    size="small"
                    options={[
                      { label: 'And', value: 'AND' },
                      { label: 'Or', value: 'OR' },
                    ]}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col>
              <CloseOutlined onClick={onClose} style={{ fontSize: '20px' }} />
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
        contentWrapperStyle={{ height: drawerContentHeight, overflowY: 'auto' }}
        footerStyle={{ zIndex: 3, background: '#F2F2F2' }}
        bodyStyle={{ background: '#F2F2F2', paddingLeft: '0', paddingRight: '0' }}
        footer={
          <VerticalSpace>
            <Row gutter={16} justify="center">
              <Col span={20}>
                <ButtonWithIcon
                  onClick={() => {
                    setOpenTable(true);
                    clearFilter();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add
                </ButtonWithIcon>
              </Col>
            </Row>
            <Row gutter={32} justify="center">
              <Col span={10}>
                <Button style={{ marginRight: 8 }} onClick={() => form.resetFields()} block>
                  Clean All
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
        <div id="queries-form-body">
          <QueriesForm openTable={openTable} setOpenTable={setOpenTable} clearFilter={clearFilter} />
        </div>
      </Drawer>
    </Form>
  );
};
