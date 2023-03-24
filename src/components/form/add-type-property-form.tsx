import { Form, Space, Tooltip } from 'antd';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from './form-item';

import { InfoCircleFilled } from '@ant-design/icons';
import { Button } from 'components/button';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useCreateProjectNodeTypeProperty } from 'api/project-node-type-property/use-create-project-node-type-property';
import { PropertyDataTypeSelect } from 'components/select/property-data-type-select';
import { useDeleteProjectNodeTypeProperty } from 'api/project-node-type-property/use-delete-project-node-type-property';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { Checkbox } from 'components/checkbox';
import { VerticalSpace } from 'components/space/vertical-space';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

type Props = {
  isEdit?: boolean;
};

export const AddTypePropertyForm = ({ isEdit = false }: Props) => {
  const { state, dispatch } = useTypeProperty();
  const { mutate } = useCreateProjectNodeTypeProperty(
    {
      onSuccess: ({ data }) => {
        return;
      },
    },
    isEdit ? state.typePropertyId : undefined
  );

  const { mutate: mutateDelete } = useDeleteProjectNodeTypeProperty(state.typePropertyId, {
    onSuccess: () => {
      dispatch({ type: TypePropertyActionKind.DELETE_TYPE_START, payload: {} });
    },
  });
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEdit) {
      // form.setFieldsValue({
      //     'name': titleText,
      //     'color': color,
      //     'parent_id': parentId,
      // });
    }
  }, [isEdit]);

  const onFinish = (values: ProjectNodeTypePropertySubmit) => {
    mutate(values);
    form.resetFields();
    if (isEdit) {
      dispatch({ type: TypePropertyActionKind.EDIT_TYPE_FINISH, payload: {} });
    } else {
      dispatch({ type: TypePropertyActionKind.ADD_TYPE_FINISH, payload: {} });
    }
  };

  /** this action works only for create */
  const onHandleCancel = () => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_CANCEL, payload: { titleText: undefined } });
    form.resetFields();
  };

  /** this action works only for edit */
  const onHandleDelete = () => {
    mutateDelete();
  };

  return (
    <Wrapper>
      <Form
        name="project-node-type-property"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <Space size={8}>
          <Text>{isEdit ? 'Edit type' : 'Add property for type'}</Text>
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
        <FormItem
          name="name"
          label="Property name"
          rules={[
            { required: true, message: 'Property name name is required' },
            { min: 3, message: 'The minimum length for this field is 3 characters' },
            { max: 30, message: 'The maximum length for this field is 30 characters' },
          ]}
        >
          <FormInput placeholder="Property name" />
        </FormItem>
        <FormItem name="ref_property_type_id" label="Data type">
          <PropertyDataTypeSelect />
        </FormItem>
        <FormItem name="required_type" valuePropName="checked" initialValue={false}>
          <Space align="start">
            <Checkbox>Required</Checkbox>
            <Tooltip title="Useful information" placement="right">
              <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
            </Tooltip>
          </Space>
        </FormItem>
        <FormItem name="multiple_type" valuePropName="checked" initialValue={false}>
          <Space align="start">
            <Checkbox>Multiple</Checkbox>
            <Tooltip title="Useful information" placement="right">
              <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
            </Tooltip>
          </Space>
        </FormItem>
        <FormItem name="unique_type" valuePropName="checked" initialValue={false}>
          <Space align="start">
            <Checkbox>Set field as unique</Checkbox>
            <Tooltip title="Useful information" placement="right">
              <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
            </Tooltip>
          </Space>
        </FormItem>
        <FormItem>
          <VerticalSpace>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
            {isEdit ? (
              <Button block type="text" onClick={onHandleDelete}>
                Delete
              </Button>
            ) : (
              <Button block type="text" onClick={onHandleCancel}>
                Cancel
              </Button>
            )}
          </VerticalSpace>
        </FormItem>
      </Form>
    </Wrapper>
  );
};
