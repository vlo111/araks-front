import styled from 'styled-components';
import { InfoCircleFilled } from '@ant-design/icons';
import { Checkbox, Form, FormInstance, Space, Tooltip } from 'antd';

import { FormInput } from 'components/input';
import { Text } from 'components/typography';
import { FormItem } from 'components/form/form-item';
import { Button } from 'components/button';
import { TreeSelect } from 'components/select';
import { ColorSelect } from 'components/select/color-select';
import { VerticalSpace } from 'components/space/vertical-space';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ProjectNodeTypeSubmit } from 'types/project-node-types';
import { useCreateType } from 'api/schema/use-create-types';

const Wrapper = styled.div`
  padding: 24px 24px 8px;
  width: 422px;
`;

type Props = {
  isEdit?: boolean;
  form: FormInstance;
};

export const AddSchemaTypeForm = ({ isEdit = false, form }: Props) => {
  const { setAddTypeModal, nodesTree, setSelectedNode } = useSchema() || {};

  const { mutate: createType } = useCreateType(
    {
      onSuccess: ({ data: { id } }) => {
          setSelectedNode(id);
      },
    },
    undefined
  );

  /** this action works only for create */
  const onHandleCancel = () => {
    setAddTypeModal(undefined);

    form.resetFields();
  };

  const onFinish = (values: ProjectNodeTypeSubmit) => {
    createType(
      isEdit
        ? ({
            parent_id: values.parent_id,
            name: values.name,
            color: values.color,
          } as ProjectNodeTypeSubmit)
        : values
    );

    onHandleCancel();
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
            treeData={nodesTree}
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
        <FormItem name="color" rules={[{ required: true, message: 'Node type color is required' }]}>
          <ColorSelect />
        </FormItem>
        <FormItem>
          <VerticalSpace>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
            {isEdit ? (
              <Button block type="text">
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
