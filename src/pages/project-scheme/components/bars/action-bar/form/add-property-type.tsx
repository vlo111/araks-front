import styled from 'styled-components';
import { Node } from '@antv/x6';
import { Form, Space, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';

import { PropertyDataTypeSelect } from 'components/select/property-data-type-select';
import { VerticalSpace } from 'components/space/vertical-space';
import { Checkbox } from 'components/checkbox';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { useCallback, useEffect, useMemo } from 'react';
import { useCreateTypeProperty } from 'api/schema/type-property/use-create-type-ptoperty';
import { useDeleteTypeProperty } from 'api/schema/type-property/use-delete-type-property';
import { SELECTORS } from 'helpers/constants';
import { PortAttributes } from 'components/layouts/components/schema/types';

type InitEditForm = (attrs: PortAttributes) => void;

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddSchemaTypePropertyForm = () => {
  const { addPortModal, setAddPortModal } = useSchema() || {};

  const [form] = Form.useForm();

  const type = useMemo(() => addPortModal?.node as Node<Node.Properties>, [addPortModal]);

  const initEditForm: InitEditForm = useCallback(
    ({
      [SELECTORS.PORT_NAME_TEXT]: { text: name },
      [SELECTORS.PORT_TYPE_TEXT]: { text: ref_property_type_id },
      required_type,
      multiple_type,
      unique_type,
    }) => {
      form.setFieldsValue({
        name,
        ref_property_type_id,
        required_type,
        multiple_type,
        unique_type,
      });
    },
    [form]
  );

  const { mutate } = useCreateTypeProperty({}, addPortModal?.portId);

  const { mutate: mutateDelete } = useDeleteTypeProperty(addPortModal?.portId, {
    onSuccess: () => {
      onHandleCancel();
    },
  });

  const onHandleCancel = () => {
    setAddPortModal(undefined);
  };

  const onHandleDelete = () => {
    mutateDelete();
  };

  const onFinish = (values: ProjectNodeTypePropertySubmit) => {
    mutate(addPortModal?.isUpdate ? {
      ...values,
      project_type_id: type.id,
      propertyId: addPortModal?.portId
    } : {
      ...values,
      project_type_id: type.id,
    });
    form.resetFields();

    onHandleCancel();
  };

  useEffect(() => {
    const { isUpdate, portId } = addPortModal ?? {};
    if (isUpdate) {
      initEditForm(type.portProp(portId ?? '').attrs as PortAttributes);
    }

    return () => {
      form.resetFields();
    };
  }, [addPortModal, form, initEditForm, type]);

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
          <Text>{addPortModal?.isUpdate ? 'Edit property for type' : 'Add property for type'}</Text>
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
        <FormItem
          name="ref_property_type_id"
          label="Data type"
          rules={[{ required: true, message: 'Node property data type is required' }]}
        >
          <PropertyDataTypeSelect />
        </FormItem>
        <FormItem name="required_type" valuePropName="checked" initialValue={false}>
          <Checkbox>
            <Space>
              Required
              <Tooltip title="Useful information" placement="right">
                <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
              </Tooltip>
            </Space>
          </Checkbox>
        </FormItem>
        <FormItem name="multiple_type" valuePropName="checked" initialValue={false}>
          <Checkbox>
            <Space>
              Multiple
              <Tooltip title="Useful information" placement="right">
                <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
              </Tooltip>
            </Space>
          </Checkbox>
        </FormItem>
        <FormItem name="unique_type" valuePropName="checked" initialValue={false}>
          <Checkbox>
            <Space>
              Set field as unique
              <Tooltip title="Useful information" placement="right">
                <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
              </Tooltip>
            </Space>
          </Checkbox>
        </FormItem>
        <FormItem>
          <VerticalSpace>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
            {addPortModal?.isUpdate ? (
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
