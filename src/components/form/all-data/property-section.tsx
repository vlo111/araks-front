import { CaretDownFilled, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { Collapse, DatePicker, Form, Radio, Space } from 'antd';
import { Icon } from 'components/icon';
import { Input } from 'components/input';
import { InputNumber } from 'components/input-number';
import { QueriesSelect, QueryFilterTypes } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';
import { ColorSelect } from '../../select/color-select';
import { CircleColor } from 'pages/project-visualisation/components/circle-color';
import { useCallback } from 'react';
import { IconSelector } from 'pages/project-visualisation/components/icon-selector';
import { useGraph } from '../../layouts/components/visualisation/wrapper';
import { CircleSizeComponent } from 'pages/project-visualisation/components/size-selector';
import { BorderSizeComponent } from 'pages/project-visualisation/components/size-selector/border-size';
import { BorderType } from 'pages/project-visualisation/components/size-selector/border-type';
import G6, { INode } from '@antv/g6';
import { PropertyTypes } from 'components/form/property/types';
import { Datepicker } from 'components/datepicker';
import dayjs from 'dayjs';
import { useGetEnum } from 'api/enum/use-get-enum';
import { SelectEnumItems } from '../../select/enum-select';

const dateFormat = 'DD/MM/YYYY';

const { RangePicker } = DatePicker;

type Props = {
  remove: (x: number) => void;
  fieldName: number;
  isVisualisation?: boolean;
};

type ContentType = {
  fieldName: number | string;
  propertyType: PropertyTypes;
  id?: string | undefined;
};

const StyledCollapse = styled(Collapse)`
  background: linear-gradient(137deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: -1px 4px 4px 0 rgba(128, 128, 128, 0.1);
  border-radius: 0;
`;

const StyledQuerySelectWrapper = styled.div`
  margin-top: 24px;
`;

export const QueriesContent = ({ fieldName, propertyType, id }: ContentType) => {
  const type = Form.useWatch(['queries', fieldName, 'type']);

  const { data } = useGetEnum(id ?? '', {
    enabled:
      !!id && (type === QueryFilterTypes.IS || type === QueryFilterTypes.IS_NOT) && propertyType === PropertyTypes.ENUM,
  });

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 4 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 20 },
  //   },
  // };

  // const formItemLayoutWithOutLabel = {
  //   wrapperCol: {
  //     xs: { span: 24, offset: 0 },
  //     sm: { span: 20, offset: 4 },
  //   },
  // };

  const getColumnInput = (id: string | undefined, type: QueryFilterTypes, propertyType: PropertyTypes) => {
    switch (true) {
      case (type === QueryFilterTypes.IS || type === QueryFilterTypes.IS_NOT) && propertyType === PropertyTypes.ENUM:
        return (
          <SelectEnumItems
            mode="multiple"
            popupClassName="enum-dropdown"
            suffixIcon={<CaretDownFilled />}
            fieldNames={{ value: 'id', label: 'name' }}
            options={data}
          />
        );
      case (type === QueryFilterTypes.CONTAINS || type === QueryFilterTypes.IS || type === QueryFilterTypes.IS_NOT) &&
        propertyType === PropertyTypes.Date:
        return (
          <Datepicker
            format={dateFormat}
            style={{ width: '100%' }}
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm') }}
          />
        );
      case (type === QueryFilterTypes.CONTAINS || type === QueryFilterTypes.IS || type === QueryFilterTypes.IS_NOT) &&
        propertyType === PropertyTypes.DateTime:
        return (
          <Datepicker
            format={dateFormat}
            style={{ width: '100%' }}
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm') }}
          />
        );
      case (type === QueryFilterTypes.IS || type === QueryFilterTypes.IS_NOT) && propertyType === PropertyTypes.Boolean:
        return (
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        );
      default:
        return <Input />;
    }
  };

  return (
    <>
      {(type === QueryFilterTypes.CONTAINS || type === QueryFilterTypes.IS || type === QueryFilterTypes.IS_NOT) && (
        <Form.Item name={[fieldName, 'typeText']} rules={[{ required: true, message: 'Field is required' }]}>
          {getColumnInput(id, type, propertyType)}
        </Form.Item>
      )}
      {type === QueryFilterTypes.GREATHER_THAN && (
        <Form.Item name={[fieldName, 'typeText']} rules={[{ required: true, message: 'Field is required' }]}>
          <InputNumber addonAfter="<" style={{ width: '100%' }} />
        </Form.Item>
      )}
      {type === QueryFilterTypes.LESS_THAN && (
        <Form.Item name={[fieldName, 'typeText']} rules={[{ required: true, message: 'Field is required' }]}>
          <InputNumber addonBefore="<" style={{ width: '100%' }} />
        </Form.Item>
      )}
      {(type === QueryFilterTypes.IS_NOT || type === QueryFilterTypes.IS_NULL) && <></>}
      {type === QueryFilterTypes.BETWEEN && (
        <Form.Item
          name="betweenValidation"
          rules={[
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (
                  !getFieldValue(['queries', fieldName, 'betweenStart']) ||
                  !getFieldValue(['queries', fieldName, 'betweenEnd'])
                ) {
                  return Promise.reject(new Error('The fields are required'));
                }

                if (
                  getFieldValue(['queries', fieldName, 'betweenStart']) >
                  getFieldValue(['queries', fieldName, 'betweenEnd'])
                ) {
                  return Promise.reject(new Error('Start value should be lower than end value'));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Space align="center">
            <Form.Item name={[fieldName, 'betweenStart']} dependencies={['queries', fieldName, 'betweenEnd']} noStyle>
              <InputNumber />
            </Form.Item>
            <MinusOutlined />
            <Form.Item name={[fieldName, 'betweenEnd']} noStyle dependencies={['queries', fieldName, 'betweenStart']}>
              <InputNumber />
            </Form.Item>
          </Space>
        </Form.Item>
      )}
      {type === QueryFilterTypes.RANGE && (
        <Form.Item
          name={[fieldName, 'typeText']}
          rules={[
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('The fields are required'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <RangePicker format={dateFormat} style={{ width: '100%' }} />
        </Form.Item>
      )}
      {type === QueryFilterTypes.BEFORE && (
        <Form.Item name={[fieldName, '<']} rules={[{ required: true, message: 'Field is required' }]}>
          <Datepicker
            format={`DD/MM/YYYY ${propertyType === PropertyTypes.DateTime ? 'HH:mm' : ''}`}
            style={{ width: '100%' }}
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm') }}
          />
        </Form.Item>
      )}
      {type === QueryFilterTypes.AFTER && (
        <Form.Item name={[fieldName, '>']} rules={[{ required: true, message: 'Field is required' }]}>
          <Datepicker
            format={`DD/MM/YYYY ${propertyType === PropertyTypes.DateTime ? 'HH:mm' : ''}`}
            style={{ width: '100%' }}
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm') }}
          />
        </Form.Item>
      )}
      {type === QueryFilterTypes.EQUAL_TO && (
        <Form.Item name={[fieldName, 'typeText']} rules={[{ required: true, message: 'Field is required' }]}>
          <InputNumber addonBefore="=" style={{ width: '100%' }} />
        </Form.Item>
      )}
    </>
  );
};

export const PropertySection = ({ remove, fieldName, isVisualisation }: Props) => {
  const form = Form.useFormInstance();
  const { graph, setGraphInfo } = useGraph() || {};
  const queriesList = form.getFieldValue('queries');

  const setValue = useCallback(
    (color: string) => {
      form.setFieldValue(['queries', fieldName, 'color'], color);
    },
    [form, fieldName]
  );
  const onChange = (key: string | string[]) => {
    // eslint-disable-next-line no-console
    console.log(key);
  };

  const removeGraphStyle = (id: string) => {
    const filteredNodes = graph.getNodes().filter((node: INode) => id === node.getModel()?.nodeType);
    filteredNodes.forEach((node) => {
      graph.updateItem(node.getID(), {
        size: 40,
        icon: {
          show: false,
          img: node.getModel()?.img ? node.getModel()?.img : '',
        },
        type: node.getModel()?.img ? 'image' : 'circle',
        style: {
          stroke: node.getModel()?.color as string,
          fill: node.getModel()?.img ? 'transparent' : 'white',
        },
      });
    });
    const filteredEdges = graph
      ?.getEdges()
      ?.filter((edge) => id === edge.getModel().project_edge_type_id || edge.getModel().label);

    filteredEdges?.forEach((edge) => {
      graph.updateItem(edge.getID() as string, {
        style: {
          stroke: '#C3C3C3',
          lineWidth: 2,
          lineDash: [],
          endArrow: {
            fill: '#C3C3C3',
            path: G6.Arrow.triangle(10, 15, 5),
            d: 5,
          },
        },
      });
    });
  };

  const genExtra = () => (
    <CloseOutlined
      style={{ fontSize: '16px' }}
      onClick={(event) => {
        event.stopPropagation();
        remove(fieldName);
        removeGraphStyle(queriesList[fieldName]?.id);
        removeGraphStyle(queriesList[fieldName]?.parent_id);
        removeGraphStyle(queriesList[fieldName]?.edge?.id);

        setGraphInfo({
          nodeCount: graph.getNodes().length,
        });
      }}
    />
  );
  return (
    <VerticalSpace size={0}>
      {queriesList[fieldName]?.color && (
        <div style={{ backgroundColor: queriesList[fieldName]?.color, height: '8px' }} />
      )}
      <StyledCollapse
        defaultActiveKey={['1']}
        onChange={onChange}
        items={[
          {
            key: '1',
            label: (
              <Space>
                {isVisualisation && <CircleColor color={queriesList[fieldName]?.color} />}
                <>{queriesList[fieldName].isConnectionType && <Icon size={20} icon="connection" />}</>
                {queriesList[fieldName].labelName}
              </Space>
            ),
            children: (
              <>
                <>
                  {isVisualisation && (
                    <>
                      {!queriesList[fieldName].isConnectionType && (
                        <>
                          <Form.Item name={[fieldName, 'size']} rules={[{ required: false, message: 'Missing size' }]}>
                            <CircleSizeComponent initialSize={queriesList[fieldName]?.size} fieldName={fieldName} />
                          </Form.Item>
                          <Form.Item name={[fieldName, 'icon']} rules={[{ required: false, message: 'Missing icon' }]}>
                            <IconSelector fieldName={fieldName} />
                          </Form.Item>
                          <Form.Item
                            name={[fieldName, 'color']}
                            rules={[{ required: false, message: 'Missing color' }]}
                          >
                            <ColorSelect
                              initialColor={queriesList[fieldName]?.color}
                              fieldName={fieldName}
                              setValue={setValue}
                            />
                            <StyledQuerySelectWrapper>
                              {queriesList[fieldName].depth !== 1 && (
                                <VerticalSpace>
                                  {queriesList[fieldName]?.labelHead}
                                  <Form.Item
                                    name={[fieldName, 'type']}
                                    rules={[{ required: true, message: 'Missing type' }]}
                                  >
                                    <QueriesSelect
                                      depth={queriesList[fieldName].depth}
                                      isConnection={queriesList[fieldName].isConnectionType}
                                      isVisualisation={isVisualisation}
                                      propertyType={queriesList[fieldName]?.ref_property_type_id}
                                      isMultiple={queriesList[fieldName]?.multiple_type}
                                    />
                                  </Form.Item>
                                  <QueriesContent
                                    fieldName={fieldName}
                                    propertyType={queriesList[fieldName].ref_property_type_id}
                                  />
                                </VerticalSpace>
                              )}
                            </StyledQuerySelectWrapper>
                          </Form.Item>
                        </>
                      )}
                      {queriesList[fieldName].isConnectionType && (
                        <VerticalSpace>
                          <Form.Item
                            name={[fieldName, 'borderSize']}
                            rules={[{ required: false, message: 'Missing Border Size' }]}
                          >
                            <BorderSizeComponent initialSize={queriesList[fieldName].size} fieldName={fieldName} />
                          </Form.Item>
                          <Form.Item
                            name={[fieldName, 'borderType']}
                            rules={[{ required: false, message: 'Missing Border Type' }]}
                          >
                            <BorderType fieldName={fieldName} />
                          </Form.Item>
                          <Form.Item
                            name={[fieldName, 'color']}
                            rules={[{ required: false, message: 'Missing color' }]}
                          >
                            <ColorSelect
                              initialColor={queriesList[fieldName]?.color}
                              fieldName={fieldName}
                              setValue={setValue}
                            />
                          </Form.Item>
                        </VerticalSpace>
                      )}
                    </>
                  )}
                </>
                {!isVisualisation && (
                  <VerticalSpace>
                    {queriesList[fieldName]?.labelHead}
                    <Form.Item name={[fieldName, 'type']} rules={[{ required: true, message: 'Missing type' }]}>
                      <QueriesSelect
                        depth={queriesList[fieldName].depth}
                        isConnection={queriesList[fieldName].isConnectionType}
                        propertyType={queriesList[fieldName]?.ref_property_type_id}
                        isMultiple={queriesList[fieldName]?.multiple_type}
                      />
                    </Form.Item>
                    <QueriesContent
                      id={queriesList[fieldName].id}
                      fieldName={fieldName}
                      propertyType={queriesList[fieldName].ref_property_type_id}
                    />
                  </VerticalSpace>
                )}
              </>
            ),
            extra: genExtra(),
            showArrow: false,
          },
        ]}
      />
    </VerticalSpace>
  );
};
