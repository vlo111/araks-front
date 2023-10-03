import React, { useEffect, useMemo } from 'react';
import { Checkbox, Form, Space, Spin, Tooltip } from 'antd';
import { Text } from 'components/typography';
import { InfoCircleFilled } from '@ant-design/icons';
import { FormItem } from 'components/form/form-item';
import { FormInput } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { Button } from 'components/button';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import styled from 'styled-components';
import { useDeleteEdge } from 'api/schema/edge/use-delete-edge';
import { useGetEdge } from 'api/schema/edge/use-get-edge';
import { ProjectEdgeForm } from 'types/project-edge';
import { AddEdgeType } from 'components/layouts/components/schema/types';
import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { TreeSelect } from 'components/select';
import { Rule } from 'antd/es/form';
import { InverseFormItem } from './inverse-form-item';

const AddEdge = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddSchemaEdgeForm: React.FC = () => {
  const [form] = Form.useForm();

  const {
    nodes,
    edge: { id, isUpdate, isConnector, source, target },
    finishEdgeType,
    edge_port: { isOpened },
    startEdgePort,
  } = useSchema() || {};

  const treeNodes = useMemo(() => createNodesTree(nodes), [nodes]);

  const { mutate: mutateDelete } = useDeleteEdge({
    onSuccess: () => {
      finishEdgeType();
    },
  });

  const { mutate: createEdge } = useCreateEdge(id);

  const addEdge: AddEdgeType = (item) => createEdge({ ...item });

  const { isInitialLoading } = useGetEdge(id as string, {
    enabled: !!isUpdate,
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
        source: data?.source?.name,
        target: data?.target?.name,
      });
    },
  });

  useEffect(() => {
    form.resetFields();
  }, [form, isUpdate]);

  useEffect(() => {
    if (isConnector) {
      form.setFieldsValue({
        source_id: nodes.find((n) => n.id === source)?.id,
        target_id: nodes.find((n) => n.id === target)?.id,
      });
    }
    return () => form.resetFields();
  }, [isConnector, source, target, form, nodes]);

  const onHandleCancel = () => {
    form.resetFields();
    finishEdgeType();
  };

  const onHandleDelete = async () => {
    mutateDelete(id || '');
    form.resetFields();
    finishEdgeType();
  };

  const onFinish = async ({ ...values }: ProjectEdgeForm) => {
    const find = (id: string) =>
      nodes.find((n) => n.id === id)?.properties.find((p) => p.default_property) ?? { id: '' };

    const { id: source_attribute_id } = find(values.source_id);

    const { id: target_attribute_id } = find(values.target_id);

    addEdge({
      id,
      source_attribute_id,
      target_attribute_id,
      ...values,
    });

    if (isOpened) startEdgePort({ name: values.name });

    finishEdgeType();

    if (!isUpdate) form.resetFields();
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
              {
                required: true,
                message: 'Connection name is required',
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
            <FormInput placeholder="Connection name" />
          </FormItem>

          <FormItem name="source_id" label="Source" rules={[{ required: true, message: 'Source is required' }]}>
            <TreeSelect
              treeData={treeNodes}
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              fieldNames={{ value: 'key' }}
            />
          </FormItem>
          <FormItem name="target_id" label="Target" rules={[{ required: true, message: 'Target is required' }]}>
            <TreeSelect
              treeData={treeNodes}
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              fieldNames={{ value: 'key' }}
            />
          </FormItem>
          <InverseFormItem />
          <FormItem name="multiple" valuePropName="checked" initialValue={true}>
            <Checkbox disabled>
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
              {isUpdate ? (
                <Button block onClick={onHandleDelete} type="text">
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
      </Spin>
    </AddEdge>
  );
};
