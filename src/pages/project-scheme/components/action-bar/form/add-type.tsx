import { useEffect, useMemo } from 'react';
import { Checkbox, Form, Space, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';
import { TreeSelect } from 'components/select';
import { VerticalSpace } from 'components/space/vertical-space';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ProjectNodeTypeSubmit } from 'types/project-node-types';
import { useCreateType } from 'api/schema/type/use-create-types';
import { SelectColor } from '../components/select-color';
import { useDeleteType } from 'api/schema/type/use-delete-type';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { PATH } from 'helpers/constants';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

export const AddSchemaTypeForm = () => {
  const [form] = Form.useForm();

  const { nodes, setSelected, selected, finishType } = useSchema() || {};

  const isEdit = useMemo(() => selected.node, [selected]);

  const { mutate: createType } = useCreateType(
    {
      onSuccess: ({ data: { id } }) => {
        setSelected({ id });
      },
    },
    isEdit ? selected.node?.id : undefined
  );

  const { mutate: mutateDelete } = useDeleteType({});

  const onHandleDelete = () => {
    mutateDelete(selected?.node?.id || '');

    setSelected({
      selected: false,
    });

    finishType();
  };

  const onFinish = (values: ProjectNodeTypeSubmit) => {
    createType({ ...values });

    finishType();
  };

  useEffect(() => {
    form.setFieldsValue({
      name: selected.node?.attr(PATH.NODE_TEXT),
      color: selected.node?.attr(PATH.NODE_COLOR),
      parent_id: selected.node?.attr('parentId'),
    });

    return () => form.resetFields();
  }, [form, selected]);

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
          <Text>{isEdit ? 'Edit type' : 'Write new type data'}</Text>
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
        <FormItem
          name="name"
          label="Node type"
          rules={[
            { required: true, message: 'Node type name is required' },
            { min: 3, message: 'The minimum length for this field is 3 characters' },
            { max: 30, message: 'The maximum length for this field is 30 characters' },
          ]}
        >
          <FormInput placeholder="Node type" />
        </FormItem>
        <FormItem name="parent_id">
          <TreeSelect
            treeData={createNodesTree(nodes)}
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            fieldNames={{ value: 'key' }}
          />
        </FormItem>

        {!isEdit && (
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.parent_id !== currentValues.parent_id}
          >
            {({ getFieldValue }) => (
              <Space align="start">
                <FormItem name="inherit" valuePropName="checked">
                  <Checkbox disabled={!getFieldValue('parent_id')}>Inherit properties</Checkbox>
                </FormItem>
                <Tooltip title="Useful information" placement="right">
                  <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
                </Tooltip>
              </Space>
            )}
          </Form.Item>
        )}
        <Form.Item name="color" rules={[{ required: true, message: 'Node type color is required' }]}>
          <SelectColor />
        </Form.Item>
        <FormItem>
          <VerticalSpace>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
            {isEdit ? (
              <Button block onClick={onHandleDelete} type="text">
                Delete
              </Button>
            ) : (
              <Button block type="text" onClick={finishType}>
                Cancel
              </Button>
            )}
          </VerticalSpace>
        </FormItem>
      </Form>
    </Wrapper>
  );
};
