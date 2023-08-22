import styled from 'styled-components';
import { Node } from '@antv/x6';
import { Form, Skeleton, Space } from 'antd';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';
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
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { Rule } from 'antd/es/form';
import { EditNodePropertyTypeInfoModal } from 'components/modal/edit-node-property-type-info-modal';
import { useGetProjectNodeTypeProperty } from 'api/project-node-type-property/use-get-project-node-type-property';
import { PropertyDataTypeSelectSchema } from './property-data-type-select';

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

  const { mutate } = useCreateTypeProperty(
    {
      onSuccess: () => {
        form.resetFields();
      },
    },
    isUpdate ? portId : undefined
  );

  const { mutate: mutateConnection } = useCreateEdge(undefined, {
    onSuccess: ({ data }) => {
      form.resetFields();
    },
  });

  // get node type edit data
  const { data, isInitialLoading } = useGetProjectNodeTypeProperty(portId, {
    enabled: !!portId,
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
      });
    },
  });

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

    finishTypePort();
  };

  useEffect(() => {
    if (isUpdate) initEditForm(type.portProp(portId ?? '').attrs as PortAttributes);

    return () => {
      form.resetFields();
    };
  }, [form, initEditForm, type, isUpdate, portId]);

  return (
    <Skeleton loading={isInitialLoading}>
      <Wrapper>
        <Form
          name="project-node-type-property-schema"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <Space size={8}>
            <Text>{isUpdate ? 'Edit Property' : 'Add property for type'}</Text>
            <UsefulInformationTooltip infoText="Inherit parent options" />
          </Space>
          {!data?.default_property && (
            <FormItem
              name="name"
              label="Property name"
              rules={[
                {
                  required: true,
                  message: 'Property name is required',
                },
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
          )}
          <FormItem
            name="ref_property_type_id"
            label="Data type"
            rules={[{ required: true, message: 'Node property data type is required' }]}
            hidden={data?.default_property}
          >
            <PropertyDataTypeSelectSchema
              nodeTypeId={type.id}
              propertyTypeId={data?.ref_property_type_id}
              isEdit={isUpdate}
            />
          </FormItem>
          <PropertyBasicDetails />
          <PropertyConnectionDetailsSchema typeId={type.id} />
          <FormItem>
            <VerticalSpace>
              {isUpdate ? (
                <EditNodePropertyTypeInfoModal id={data?.id} initPropertyType={data?.ref_property_type_id} />
              ) : (
                <Button block type="primary" htmlType="submit">
                  Save
                </Button>
              )}
              {isUpdate ? (
                <Button block type="text" onClick={onHandleDelete} disabled={data?.default_property}>
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
    </Skeleton>
  );
};
