import { useCallback, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { PlusAction } from 'components/actions/plus';
import { Col, Drawer, Form, Radio, Row, Space } from 'antd';
import { VisualizationSubmitType } from 'api/neo4j/types';
import { useQueriesVisualization } from 'api/neo4j/use-queries-visualization';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { getQueryFilterType, QueryFilterTypes } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { useOverview } from 'context/overview-context';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import styled from 'styled-components';
import { formattedData } from '../layouts/components/visualisation/helpers/format-node';
import { initData } from '../layouts/components/visualisation/container/initial/nodes';
import { useGraph } from '../layouts/components/visualisation/wrapper';
import {
  StyledAddButton,
  StyledButtonsWrapper,
  StyledCleanButton,
  StyledDiv,
  StyledRunButton,
} from '../../pages/project-visualisation/components/buttons/styles';
import { useGetData } from '../../api/visualisation/use-get-data';
import { graphRender } from '../layouts/components/visualisation/helpers/utils';
import { PropertyTypes } from '../form/property/types';
import { Dayjs } from 'dayjs';

type Props = {
  isQueries?: boolean;
};

const StyledRadioButton = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    border: none;

    &.ant-radio-button-wrapper-checked {
      border-radius: 4px;
      background: #232f6a;
      display: inline-flex;
      align-items: center;
      padding: 0 16px;
      &:hover {
        opacity: 0.8;
        background: #232f6a;
      }
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

export const getDate = (d: Dayjs) => d?.format('YYYY-MM-DD');

export const QueriesButton = ({ isQueries }: Props) => {
  const [filter, setFilter] = useState<VisualizationSubmitType>({} as VisualizationSubmitType);
  const [openTable, setOpenTable] = useState(false);
  const [drawerContentHeight, setDrawerContentHeight] = useState('100%');
  const { graph, setGraphInfo } = useGraph() ?? {};
  const { nodes: nodesList, edges: edgesList, count, relationsCounts } = useGetData();

  const { hideLeftSection, setHideLeftSection } = useOverview();
  const [form] = Form.useForm();

  const { mutate } = useQueriesVisualization(filter, {
    enabled: !!filter.queryArr?.length,
    onSuccess: (data) => {
      if (!data.nodes.length) {
        initData(graph, { edges: [], nodes: [] });
        graphRender(graph);
        setGraphInfo({
          nodeCount: 0,
        });
      } else {
        const { nodes, edges } = formattedData(data?.nodes, data?.edges, data.relationsCounts);
        const result = { nodes: nodes || [], edges: edges || [] };
        initData(graph, result);
        graphRender(graph);
        setGraphInfo({
          nodeCount: graph.getNodes().length,
        });
      }
    },
  });
  const initGraphData = () => {
    const data = formattedData(nodesList ?? [], edgesList ?? [], relationsCounts);
    if (data !== undefined) initData(graph, data);
    setGraphInfo({
      nodeCount: (count ?? 0) > 300 ? 300 : count,
    });
    graphRender(graph);
  };

  const onClose = () => {
    setHideLeftSection(false);
    form.resetFields();
  };

  const clearFilter = useCallback(() => {
    setFilter({} as VisualizationSubmitType);
  }, []);

  const handleCleanAll = () => {
    form.resetFields();
    initGraphData();
  };

  const onFinish = (values: FormQueryValues) => {
    const dataToMap = values.queries;
    let queryArr;
    if (values.operator === 'AND') {
      queryArr = dataToMap
        .filter(Boolean)
        .map((query) => ({
          type: query.isConnectionType ? 'relation' : 'node',
          label: query.labelValue,
          ...((query.isConnectionType && query.depth !== 3) || (!query.isConnectionType && query.depth === 1)
            ? { action: getQueryFilterType(query.type) }
            : {}),
          ...(query.isConnectionType && query.depth !== 1 ? { project_edge_type_id: query.id } : {}),
          query:
            (query.isConnectionType && query.depth === 3) || (!query.isConnectionType && query.depth === 2)
              ? dataToMap.reduce((acc, item, index) => {
                  if (item.depth === query.depth && item.labelValue === query.labelValue) {
                    delete dataToMap[index];

                    return {
                      ...acc,
                      [item.name === 'node_icon' ? 'default_image' : item.name]: {
                        type: item.ref_property_type_id,
                        action: getQueryFilterType(item.type),
                        multiple: item.multiple_type,
                        value: (() => {
                          if (item.type === QueryFilterTypes.BEFORE || item.type === QueryFilterTypes.AFTER) {
                            const isBefore = item.type === QueryFilterTypes.BEFORE;
                            return item[isBefore ? '<' : '>'].toISOString();
                          } else if (item.type === QueryFilterTypes.BETWEEN) {
                            return [item.betweenStart, item.betweenEnd].toString();
                          } else if (
                            item.ref_property_type_id === PropertyTypes.Date ||
                            item.ref_property_type_id === PropertyTypes.DateTime
                          ) {
                            const convertToDateString = (date: Date) =>
                              item.ref_property_type_id === PropertyTypes.Date
                                ? getDate(date as unknown as Dayjs).toString()
                                : date.toISOString();

                            if (Array.isArray(item.typeText)) {
                              return item.typeText.map(convertToDateString).toString();
                            } else {
                              return convertToDateString(item.typeText);
                            }
                          } else {
                            return item.typeText?.toString();
                          }
                        })(),
                      },
                    };
                  }
                  return acc;
                }, {})
              : {},
        }))
        .filter((item) => (!item.action && Object.keys(item.query).length) || item.action);
    } else {
      queryArr = values.queries.map((query) => ({
        type: query.isConnectionType ? 'relation' : 'node',
        label: query.labelValue,
        ...((query.isConnectionType && query.depth !== 3) || (!query.isConnectionType && query.depth === 1)
          ? { action: getQueryFilterType(query.type) }
          : {}),
        ...(query.isConnectionType && query.depth !== 1 ? { project_edge_type_id: query.id } : {}),
        query:
          (query.isConnectionType && query.depth === 3) || (!query.isConnectionType && query.depth === 2)
            ? {
                [query.name === 'node_icon' ? 'default_image' : query.name]: {
                  type: query.ref_property_type_id,
                  action: getQueryFilterType(query.type),
                  multiple: query.multiple_type,
                  value:
                    query.type === QueryFilterTypes.BEFORE || query.type === QueryFilterTypes.AFTER
                      ? query[query.type === QueryFilterTypes.BEFORE ? '<' : '>'].toISOString()
                      : (query.type === QueryFilterTypes.BETWEEN
                          ? [query.betweenStart, query.betweenEnd]
                          : query.ref_property_type_id === PropertyTypes.Date ||
                            query.ref_property_type_id === PropertyTypes.DateTime
                          ? Array.isArray(query.typeText)
                            ? query.typeText.map((t: Date) =>
                                query.ref_property_type_id === PropertyTypes.Date
                                  ? getDate(t as unknown as Dayjs)
                                  : t.toISOString()
                              )
                            : query.ref_property_type_id === PropertyTypes.Date
                            ? getDate(query.typeText as unknown as Dayjs)
                            : query.typeText.toISOString()
                          : query.typeText
                        )?.toString(),
                },
              }
            : {},
      }));
    }

    const data = {
      operator: values.operator,
      queryArr: queryArr,
    } as VisualizationSubmitType;
    setFilter(data);
    mutate(data);
  };

  useEffect(() => {
    const headerHeight = document.getElementById('overview-header')?.clientHeight;
    const headerTabsHeight = document.querySelector('#overview-header-tabs .ant-tabs-nav')?.clientHeight;

    // Calculate the content height and set it to state
    const contentHeight = `calc(100vh - ${headerHeight}px - ${headerTabsHeight}px - 20px)`;
    setDrawerContentHeight(contentHeight);
  }, []);

  const renderHeader = () => {
    return (
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
    );
  };

  const renderQueriesForm = () => {
    return (
      <div id="queries-form-body">
        <QueriesForm openTable={openTable} setOpenTable={setOpenTable} clearFilter={clearFilter} />
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div style={{ marginTop: 'auto' }}>
        <VerticalSpace>
          <StyledButtonsWrapper>
            <StyledAddButton
              onClick={() => {
                setOpenTable(true);
                clearFilter();
              }}
              block
            >
              <PlusAction /> Add
            </StyledAddButton>
            <StyledDiv>
              <StyledCleanButton onClick={handleCleanAll} block>
                Clean All
              </StyledCleanButton>
              <StyledRunButton type="primary" htmlType="submit" block>
                Run
              </StyledRunButton>
            </StyledDiv>
          </StyledButtonsWrapper>
        </VerticalSpace>
      </div>
    );
  };

  const renderVisualizationHeader = () => {
    const infoText = 'And - All conditions must be satisfied. Or - At least one condition should be satisfied';

    return (
      <Row justify="end">
        <Col span={8}>
          <Space>
            <UsefulInformationTooltip infoText={infoText} />
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
      </Row>
    );
  };

  const renderContent = () => {
    if (isQueries) {
      return (
        <>
          {renderVisualizationHeader()}
          {renderQueriesForm()}
          {renderFooter()}
        </>
      );
    }
    return (
      <Drawer
        className="queries-filter-drawer"
        headerStyle={{ background: '#F2F2F2', padding: '12px 16px 12px 12px' }}
        title={renderHeader()}
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
        footer={renderFooter()}
      >
        {renderQueriesForm()}
      </Drawer>
    );
  };

  return (
    <Form
      style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
      name="all-data-query-filter"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      scrollToFirstError
    >
      {renderContent()}
    </Form>
  );
};
