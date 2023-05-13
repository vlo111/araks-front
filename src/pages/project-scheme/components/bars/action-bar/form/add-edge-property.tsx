import React, { useEffect, useMemo } from 'react';
import { Form, Space, Tooltip } from 'antd';
import { Text } from 'components/typography';
import { InfoCircleFilled } from '@ant-design/icons';
import { FormItem } from 'components/form/form-item';
import { Rule } from 'antd/es/form';
import { FormInput } from 'components/input';
import { PropertyDataConnectionTypeSelect } from 'components/select/property-data-connection-type-select';
import { PropertyMultipleDetails } from 'components/form/property/property-multiple-details';
import { VerticalSpace } from 'components/space/vertical-space';
import { Button } from 'components/button';
import { NodeEdgeTypePropertiesSubmit } from 'types/node-edge-types';
import { useManageProjectNodeTypeProperty } from 'api/node-edge-type/use-manage-project-edge-type-property';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { useGetProjectEdgeTypeProperty } from 'api/node-edge-type/use-get-project-edge-type-property';
import { useDeleteProjectEdgeTypeProperty } from 'api/node-edge-type/use-delete-project-edge-type-property';
import styled from 'styled-components';

type Props = {
  isEdit?: boolean;
  open: boolean | string;
  onClose: React.Dispatch<React.SetStateAction<boolean | string>>;
};

const Wrapper = styled.div`
  padding: 24px 24px 8px;
`;

export const AddSchemaEdgePropertyForm: React.FC<Props> = ({ isEdit, open, onClose }) => {
  const [form] = Form.useForm();
  const { openLinkPropertyModal } = useSchema() || {};

  const id = useMemo(() => open as string, [open]);

  const { mutate: deleteEdgeProperty } = useDeleteProjectEdgeTypeProperty(id, openLinkPropertyModal?.id || '');

  const { mutate } = useManageProjectNodeTypeProperty();

  useGetProjectEdgeTypeProperty(open as string, {
    enabled: !!isEdit,
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });

  useEffect(() => {
    form.resetFields();
  }, [form, isEdit]);

  const onHandleCancel = () => {
    form.resetFields();
    onClose(false);
  };

  const onHandleDelete = async () => {
    await deleteEdgeProperty();
    form.resetFields();
    onClose(false);
  };

  const onFinish = async ({ ref_property_type_id, ...values }: NodeEdgeTypePropertiesSubmit) => {
    await mutate({
      ...values,
      ref_property_type_id,
      propertyId: isEdit ? id : undefined,
      project_type_id: openLinkPropertyModal?.id,
    } as NodeEdgeTypePropertiesSubmit);

    onClose(false);

    if (!isEdit) form.resetFields();
  };

  return (
    <Wrapper>
      <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
        <Space size={8}>
          <Text>{isEdit ? 'Edit connection property' : 'Add property for connection type'}</Text>
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
        <FormItem
          name="name"
          label="Property name"
          rules={[
            { required: true, message: 'Property name is required' },
            { min: 3, message: 'The minimum length for this field is 3 characters' },
            { max: 30, message: 'The maximum length for this field is 30 characters' },
            {
              validator: async (_: Rule, value: string | undefined) => {
                if (value !== undefined) {
                  const regex = /^[a-z0-9_]+$/;
                  if (!regex.test(value)) {
                    return Promise.reject('Name must only contain lowercase letters, numbers and underscores');
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <FormInput placeholder="Property name" />
        </FormItem>
        <FormItem
          name="ref_property_type_id"
          label="Data type"
          rules={[{ required: true, message: 'Connection property data type is required' }]}
        >
          <PropertyDataConnectionTypeSelect />
        </FormItem>
        <PropertyMultipleDetails />
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
