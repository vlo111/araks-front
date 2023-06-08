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
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { useCallback, useEffect, useMemo } from 'react';
import { useCreateTypeProperty } from 'api/schema/type-property/use-create-type-ptoperty';
import { useDeleteTypeProperty } from 'api/schema/type-property/use-delete-type-property';
import { NodeEdgeTypesForm, PortAttributes } from 'components/layouts/components/schema/types';
import { PropertyBasicDetails } from 'components/form/property/property-basic-details';
import { PropertyConnectionDetailsSchema } from './property-connection-details';
import { PropertyTypes } from 'components/form/property/types';
import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { SELECTORS } from 'components/layouts/components/schema/helpers/constants';

type InitEditForm = (attrs: PortAttributes) => void;

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddSchemaTypePropertyForm = () => {
  const {
    type_port: { node, portId, isUpdate },
    finishTypePort,
    nodes,
  } = useSchema() || {};

  const [form] = Form.useForm();

  const type = useMemo(() => node as Node<Node.Properties>, [node]);

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

  const { mutate } = useCreateTypeProperty({}, portId);

  const { mutate: mutateConnection } = useCreateEdge(undefined);

  const { mutate: mutateDelete } = useDeleteTypeProperty(portId, {
    onSuccess: () => {
      finishTypePort();
    },
  });

  const onHandleDelete = () => {
    mutateDelete();
  };

  const onFinish = ({ ref_property_type_id, ...values }: ProjectNodeTypePropertySubmit | NodeEdgeTypesForm) => {
    if (ref_property_type_id === PropertyTypes.Connection) {
      const { source_id, target_id } = values as NodeEdgeTypesForm;

      const find = (id: string) =>
        nodes.find((n) => n.id === id)?.properties.find((p) => p.default_property) ?? { id: '' };

      const { id: source_attribute_id } = find(source_id);

      const { id: target_attribute_id } = find(target_id);

      mutateConnection({
        source_attribute_id,
        target_attribute_id,
        ...values,
      } as NodeEdgeTypesForm);
    } else {
      const args = {
        ...values,
        ref_property_type_id,
        project_type_id: type.id,
        propertyId: portId,
      };

      if (isUpdate) args.propertyId = portId;

      mutate(args as ProjectNodeTypePropertySubmit);
    }

    form.resetFields();

    finishTypePort();
  };

  useEffect(() => {
    if (isUpdate) initEditForm(type.portProp(portId ?? '').attrs as PortAttributes);

    return () => form.resetFields();
  }, [form, initEditForm, type, isUpdate, portId]);

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
          <Text>{isUpdate ? 'Edit property for type' : 'Add property for type'}</Text>
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
        <PropertyConnectionDetailsSchema typeId={type.id} />
        <PropertyBasicDetails />
        <FormItem>
          <VerticalSpace>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
            {isUpdate ? (
              <Button block type="text" onClick={onHandleDelete}>
                Delete
              </Button>
            ) : (
              <Button block type="text" onClick={finishTypePort}>
                Cancel
              </Button>
            )}
          </VerticalSpace>
        </FormItem>
      </Form>
    </Wrapper>
  );
};
