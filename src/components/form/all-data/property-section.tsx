import { CloseOutlined } from '@ant-design/icons';
import { Collapse, Form, Space } from 'antd';
import { Input } from 'components/input';
import { InputNumber } from 'components/input-number';
import { QueriesSelect, QueryFilterTypes } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';

type Props = {
  remove: (x: number) => void;
  fieldName: number;
};

type ContentType = {
  fieldName: number;
};

const StyledCollapse = styled(Collapse)`
  background: linear-gradient(137deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: -1px 4px 4px 0px rgba(128, 128, 128, 0.1);
  border-radius: 0;
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
          <Space align="start">
            <Form.Item name={[fieldName, 'betweenStart']} dependencies={['queries', fieldName, 'betweenEnd']}>
              <InputNumber />
            </Form.Item>
            <span>-</span>
            <Form.Item name={[fieldName, 'betweenEnd']} noStyle dependencies={['queries', fieldName, 'betweenStart']}>
              <InputNumber />
            </Form.Item>
          </Space>
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

export const PropertySection = ({ remove, fieldName }: Props) => {
  const form = Form.useFormInstance();
  const onChange = (key: string | string[]) => {
    // eslint-disable-next-line no-console
    console.log(key);
  };

  const queriesList = form.getFieldValue('queries');
  // eslint-disable-next-line no-console
  console.log('queriesList', queriesList);

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
      <div style={{ backgroundColor: queriesList[fieldName].color, height: '8px' }} />
      <StyledCollapse
        defaultActiveKey={['1']}
        onChange={onChange}
        items={[
          {
            key: '1',
            label: queriesList[fieldName].labelName,
            children: (
              <VerticalSpace>
                <Form.Item name={[fieldName, 'type']} rules={[{ required: true, message: 'Missing type' }]}>
                  <QueriesSelect />
                </Form.Item>

                <QueriesContent fieldName={fieldName} />
              </VerticalSpace>
            ),
            extra: genExtra(),
            showArrow: false,
          },
        ]}
      />
    </VerticalSpace>
  );
};
