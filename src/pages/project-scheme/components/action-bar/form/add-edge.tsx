import { useEffect } from 'react';
import { Checkbox, Form, Space, Spin, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';

import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { EdgeDataTypeSelect } from 'components/select/edge-data-type-select';
import { AddEdgeType } from 'components/layouts/components/schema/types';

import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { ProjectEdgeForm } from 'types/project-edge';
import { useGetEdge } from 'api/schema/edge/use-get-edge';
import { useDeleteEdge } from 'api/schema/edge/use-delete-edge';

const AddEdge = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddSchemaEdgeForm = () => {
  const [form] = Form.useForm();

  const {
    nodes,
    edge: { id, source, target, isUpdate, isConnector },
    finishEdgeType,
  } = useSchema() || {};

  const { mutate: createEdge } = useCreateEdge(id);

  const { mutate: mutateDelete } = useDeleteEdge({
    onSuccess: () => {
      finishEdgeType();
    },
  });

  const { isInitialLoading } = useGetEdge(id as string, {
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
        source: data?.source?.name,
        target: data?.target?.name,
      });
    },
  });

  const onFinish = async (values: ProjectEdgeForm) => {
    try {
      await createEdgeWithTypeProperty(values);
      finishEdgeType();
      form.resetFields();
    } catch (e) {
      throw e;
    }
  };

  const addEdge: AddEdgeType = (item) => createEdge({ ...item });

  const createEdgeWithTypeProperty = async ({ name, inverse, multiple, source, target }: ProjectEdgeForm) => {
    const sourceType = nodes.find((n) => n.name === source);

    const edge_target = nodes.find((n) => n.name === target);

    const edge = {
      source_id: sourceType?.id || '',
      target_id: edge_target?.id ?? '',
      name,
      inverse,
      multiple,
    };

    addEdge({
      source_attribute_id: sourceType?.properties?.find((p) => p.default_proprty)?.id,
      target_attribute_id: edge_target?.properties?.find((p) => p.default_proprty)?.id,
      ...edge,
    });
  };

  useEffect(() => {
    if (isConnector) {
      form.setFieldsValue({
        source: nodes.find((n) => n.id === source)?.name,
        target: nodes.find((n) => n.id === target)?.name,
      });
    }
    return () => form.resetFields();
  }, [isConnector, source, target, form, nodes]);

  const onHandleDelete = () => {
    mutateDelete(id || '');
  };

  return (
    <AddEdge>
      <Spin spinning={!isUpdate ? false : isInitialLoading}>
        <Form
          name="project-node-type"
          form={form}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Space size={8}>
            <Text>{isUpdate ? 'Edit Connection' : 'Add Connection'}</Text>
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
              {id ? (
                <Button block onClick={onHandleDelete} type="text">
                  Delete
                </Button>
              ) : (
                <Button block type="text" onClick={finishEdgeType}>
                  Cancel
                </Button>
              )}
            </VerticalSpace>
          </FormItem>
        </Form>
      </Spin>
    </AddEdge>
  );
};
