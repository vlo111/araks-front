import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox, Form, Space, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';

import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { EdgeDataTypeSelect } from 'components/select/edge-data-type-select';
import { AddEdgeType, AddProperty, PropsAddEdge } from 'components/layouts/components/schema/types';

import client from 'api/client';
import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { NODE_TYPE_PROPERTY_CREATE } from 'api/schema/type-property/use-create-type-ptoperty';
import { ProjectEdgeForm } from 'types/project-edge';

const AddEdge = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddSchemaEdgeForm = ({ onCancel, form }: PropsAddEdge) => {
  const params = useParams();

  const { nodes, graph } = useSchema() || {};

  const { mutate: createEdge } = useCreateEdge();

  const onFinish = async (values: ProjectEdgeForm) => {
    try {
      await createEdgeWithTypeProperty(values);

      onCancel();
    } catch (e) {
      throw e;
    }
  };

  const addProperty: AddProperty = (id, name, multiple) =>
    client.post(NODE_TYPE_PROPERTY_CREATE, {
      name,
      propertyId: undefined,
      project_id: params.id,
      project_type_id: id,
      ref_property_type_id: 'connection',
      multiple_type: multiple,
      required_type: false,
      unique_type: false,
    });

  const addEdge: AddEdgeType = (item) => createEdge({ ...item });

  const createEdgeWithTypeProperty = async ({ name, inverse, multiple, source, target }: ProjectEdgeForm) => {
    const source_id = nodes.find((n) => n.name === source)?.id ?? '';

    const edge_target = nodes.find((n) => n.name === target);

    const edge = {
      source_id,
      target_id: edge_target?.id ?? '',
      name,
      properties: {
        inverse,
        multiple,
      },
    };

    if (inverse) {
      const {
        data: { id: source_attribute_id },
      } = await addProperty(source_id, name, multiple);

      const {
        data: { id: target_attribute_id },
      } = await addProperty(edge_target?.id ?? '', name, multiple);

      if (source_attribute_id && target_attribute_id) {
        addEdge({
          source_attribute_id,
          target_attribute_id,
          ...edge,
        });
      }
    } else {
      const {
        data: { id: source_attribute_id },
      } = await addProperty(source_id, name, multiple);

      if (source_attribute_id)
        addEdge({
          source_attribute_id,
          target_attribute_id: edge_target?.properties.find((a) => a.default_proprty)?.id,
          ...edge,
        });
    }
  };

  useEffect(() => {
    /** TODO: Edit Edge Form Field */
    // form.setFieldsValue({
    //   name: 'working for',
    //   source: nodes[0].name,
    //   target: nodes[1].name,
    //   inverse: true,
    //   multiple: true,
    // });

    return () => {
      form.resetFields();
    };
  }, [form, graph, nodes]);

  return (
    <AddEdge>
      <Form
        name="project-node-type"
        form={form}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Space size={8}>
          <Text>{'Add Connection'}</Text>
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
        <FormItem
          name="name"
          label="Connection name"
          rules={[
            { required: true, message: 'Edge name is required' },
            { min: 3, message: 'The minimum length for this field is 3 characters' },
            { max: 30, message: 'The maximum length for this field is 30 characters' },
          ]}
        >
          <FormInput placeholder="Connection name" />
        </FormItem>
        <FormItem name="source" label="Source" rules={[{ required: true, message: 'Source type most be selected' }]}>
          <EdgeDataTypeSelect />
        </FormItem>
        <FormItem name="target" label="Target" rules={[{ required: true, message: 'Target type most be selected' }]}>
          <EdgeDataTypeSelect />
        </FormItem>
        <FormItem name="inverse" valuePropName="checked" initialValue={false}>
          <Checkbox>
            <Space>
              Inverse
              <Tooltip title="Useful information" placement="right">
                <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
              </Tooltip>
            </Space>
          </Checkbox>
        </FormItem>
        <FormItem name="multiple" valuePropName="checked" initialValue={false}>
          <Checkbox>
            <Space>
              Multiple
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
            <Button block type="text" onClick={() => onCancel()}>
              Cancel
            </Button>
          </VerticalSpace>
        </FormItem>
      </Form>
    </AddEdge>
  );
};
