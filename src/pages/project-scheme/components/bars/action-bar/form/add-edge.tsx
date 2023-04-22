import { Dispatch, SetStateAction, useEffect } from 'react';
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
import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { ProjectEdgeForm, ProjectEdgeResponse } from 'types/project-edge';
import client from 'api/client';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

type Props = {
  onCancel: Dispatch<SetStateAction<boolean>>;
};

export const AddSchemaEdgeForm = ({ onCancel }: Props) => {
  const [form] = Form.useForm();
  const params = useParams();

  const { nodes } = useSchema() || {};

  const { mutate: createEdge } = useCreateEdge();

  const onHandleDelete = () => {
    // mutateDelete();

    onCancel(false);
  };

  const onFinish = async (values: ProjectEdgeForm) => {
    try {
      await createEdgeWithTypeProperty(values);

      onCancel(false);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (nodes.length > 0) {
      form.setFieldsValue({
        name: 'working for',
        source: nodes[0].name,
        target: nodes[1].name,
        inverse: true,
        multiple: true,
      });
    }

    return () => {
      form.resetFields();
    };
  }, [form, nodes]);

  const addProperty = (id: string, name: string, multiple: boolean) => {
    return client.post(`${process.env.REACT_APP_BASE_URL}node-type-property/create`, {
      project_id: params.id,
      project_type_id: id,
      propertyId: undefined,
      name,
      ref_property_type_id: 'connection',
      multiple_type: multiple,
      required_type: false,
      unique_type: false,
    });
  };

  const addEdge: (item: ProjectEdgeResponse) => void = (item) => {
    createEdge({
      ...item,
    });
  };

  const createEdgeWithTypeProperty = async ({ name, inverse, multiple, source, target }: ProjectEdgeForm) => {
    const source_id = nodes.find((n) => n.name === source)?.id ?? '';

    const target_id = nodes.find((n) => n.name === target)?.id ?? '';

    const edge = {
      source_id,
      target_id,
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
      } = await addProperty(target_id, name, multiple);

      if (source_attribute_id && target_attribute_id)
        addEdge({
          source_attribute_id,
          target_attribute_id,
          ...edge,
        });
    } else {
      const {
        data: { id: source_attribute_id },
      } = await addProperty(source_id, name, multiple);

      if (source_attribute_id)
        addEdge({
          source_attribute_id,
          target_attribute_id: 'target.id',
          ...edge,
        });
    }
  };

  return (
    <Wrapper>
      <Form
        name="project-node-type"
        form={form}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Space size={8}>
          <Text>{nodes.length > 0 ? 'Edit Connection' : 'Add Connection'}</Text>
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
        <FormItem name="source" label="Source">
          <EdgeDataTypeSelect />
        </FormItem>
        <FormItem name="target" label="Target">
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
            {nodes.length > 0 ? (
              <Button block onClick={onHandleDelete} type="text">
                Delete
              </Button>
            ) : (
              <Button block type="text" onClick={() => onCancel(false)}>
                Cancel
              </Button>
            )}
          </VerticalSpace>
        </FormItem>
      </Form>
    </Wrapper>
  );
};
