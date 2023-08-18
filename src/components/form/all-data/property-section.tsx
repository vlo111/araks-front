import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { Collapse, DatePicker, Typography, Form, Space } from 'antd';
import { Icon } from 'components/icon';
import { Input } from 'components/input';
import { InputNumber } from 'components/input-number';
import { QueriesSelect, QueryFilterTypes } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';
import { SizeComponent } from 'pages/project-visualisation/components/size-selector';
import { SelectIcon } from 'pages/project-overview/components/select-icon';
import { ColorSelect } from '../../select/color-select';

const dateFormat = 'DD/MM/YYYY';

const { RangePicker } = DatePicker;

type Props = {
  remove: (x: number) => void;
  fieldName: number;
  isVisualisation?:boolean
};

type ContentType = {
  fieldName: number | string;
};

const StyledCollapse = styled(Collapse)`
  background: linear-gradient(137deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: -1px 4px 4px 0 rgba(128, 128, 128, 0.1);
  border-radius: 0;
`;
const Text = Typography

export const StyledText = styled(Text)`
  color: #414141;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.4px;
  margin-bottom: 8px;
`

const StyledColorWrapper = styled.div`
`;

export const QueriesContent = ({ fieldName }: ContentType) => {
  const type = Form.useWatch(['queries', fieldName, 'type']);
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

  return (
    <>
      {(type === QueryFilterTypes.CONTAINS || type === QueryFilterTypes.IS || type === QueryFilterTypes.IS_NOT) && (
        <Form.Item name={[fieldName, 'typeText']} rules={[{ required: true, message: 'Field is required' }]}>
          <Input />
        </Form.Item>
      )}
      {type === QueryFilterTypes.GREATHER_THAN && (
        <Form.Item name={[fieldName, 'greaterText']} rules={[{ required: true, message: 'Field is required' }]}>
          <InputNumber addonAfter="<" style={{ width: '100%' }} />
        </Form.Item>
      )}
      {type === QueryFilterTypes.LESS_THAN && (
        <Form.Item name={[fieldName, 'lessText']} rules={[{ required: true, message: 'Field is required' }]}>
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
        <Form.Item name={[fieldName, 'rangeDates']}>
          <RangePicker format={dateFormat} style={{ width: '100%' }} />
        </Form.Item>
      )}
      {type === QueryFilterTypes.EQUAL_TO && (
        <Form.Item name={[fieldName, 'equalText']} rules={[{ required: true, message: 'Field is required' }]}>
          <InputNumber addonBefore="=" style={{ width: '100%' }} />
        </Form.Item>
      )}
    </>
  );
};

export const PropertySection = ({ remove, fieldName,isVisualisation }: Props) => {
  const form = Form.useFormInstance();
  const queriesList = form.getFieldValue('queries');

  const onChange = (key: string | string[]) => {
    // eslint-disable-next-line no-console
    console.log(key);
  };


  const genExtra = () => (
    <CloseOutlined
      style={{ fontSize: '16px' }}
      onClick={(event) => {
        event.stopPropagation();
        remove(fieldName);
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
                <>{queriesList[fieldName].isConnectionType && <Icon size={20} icon="connection" />}</>
                {queriesList[fieldName].labelName}
              </Space>
            ),
            children: (
              <>
                <VerticalSpace>
                  {queriesList[fieldName]?.labelHead}
                  <Form.Item name={[fieldName, 'type']} rules={[{ required: true, message: 'Missing type' }]}>
                    <QueriesSelect
                      depth={queriesList[fieldName].depth}
                      isConnection={queriesList[fieldName].isConnectionType}
                      propertyType={queriesList[fieldName]?.ref_property_type_id}
                    />
                  </Form.Item>
                  <QueriesContent fieldName={fieldName} />
                </VerticalSpace>
                <>
                  { isVisualisation && (
                    <>
                      <Form.Item name={[fieldName, 'size']} rules={[{ required: false, message: 'Missing size' }]} >
                        <SizeComponent initialSize={queriesList[fieldName]?.size} fieldName={fieldName} />
                      </Form.Item>
                      <Form.Item name={[fieldName, 'icon']} rules={[{ required: false, message: 'Missing size' }]}>
                        <StyledText>Select Icon</StyledText>
                        <SelectIcon initialIcon={queriesList[fieldName]?.icon} fieldName={fieldName}  />
                      </Form.Item>
                      <Form.Item name={[fieldName, 'color']} rules={[{ required: false, message: 'Missing size' }]}>
                        <StyledColorWrapper>
                          <ColorSelect initialColor={queriesList[fieldName]?.color} fieldName={fieldName}/>
                        </StyledColorWrapper>
                      </Form.Item>
                      {queriesList[fieldName].depth !== 1 && (
                        <VerticalSpace>
                          {queriesList[fieldName]?.labelHead}
                          <Form.Item name={[fieldName, 'type']} rules={[{ required: false, message: 'Missing type' }]}>
                            <QueriesSelect
                              depth={queriesList[fieldName].depth}
                              isConnection={queriesList[fieldName].isConnection}
                            />
                          </Form.Item>
                          <QueriesContent fieldName={fieldName} />
                        </VerticalSpace>
                      )}
                    </>
                  )}
              </>
                  {!isVisualisation && <VerticalSpace>
                    {queriesList[fieldName]?.labelHead}
                    <Form.Item name={[fieldName, 'type']} rules={[{ required: false, message: 'Missing type' }]}>
                      <QueriesSelect
                        depth={queriesList[fieldName].depth}
                        isConnection={queriesList[fieldName].isConnection}
                      />
                    </Form.Item>
                    <QueriesContent fieldName={fieldName} />
                  </VerticalSpace>}
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
