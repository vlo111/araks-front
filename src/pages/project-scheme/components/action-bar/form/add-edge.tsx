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
import { AddEdgeType, PropsAddEdge } from 'components/layouts/components/schema/types';

import { useCreateEdge } from 'api/schema/edge/use-create-edge';
import { ProjectEdgeForm } from 'types/project-edge';
import { useGetEdge } from 'api/schema/edge/use-get-edge';

const AddEdge = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddSchemaEdgeForm = ({ onCancel }: PropsAddEdge) => {
  const [form] = Form.useForm();

  const { nodes, graph, addLinkModal } = useSchema() || {};

  const { mutate: createEdge } = useCreateEdge(addLinkModal?.id);

  const { data, isInitialLoading } = useGetEdge(addLinkModal?.id);

  const onFinish = async (values: ProjectEdgeForm) => {
    try {
      await createEdgeWithTypeProperty(values);
      onCancel();
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
    if (addLinkModal?.id) {
      form.setFieldsValue({
        ...data,
        source: data?.source?.name,
        target: data?.target?.name,
      });
    } else {
      form.setFieldsValue({
        source: nodes.find((n) => n.id === addLinkModal?.source)?.name,
        target: nodes.find((n) => n.id === addLinkModal?.target)?.name,
      });
    }

    return () => form.resetFields();
  }, [addLinkModal, form, graph, nodes, data]);

  return (
    <AddEdge>
      <Spin spinning={!addLinkModal?.id ? false : isInitialLoading}>
        <Form
          name="project-node-type"
          form={form}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Space size={8}>
            <Text>{addLinkModal?.id ? 'Edit Connection' : 'Add Connection'}</Text>
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
      </Spin>
    </AddEdge>
  );
};
