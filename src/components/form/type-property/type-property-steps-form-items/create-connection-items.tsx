import styled from 'styled-components';
import { Checkbox, Form, Space, Tooltip } from 'antd';
import { Text } from '../../../typography';
import { InfoCircleFilled } from '@ant-design/icons';
import { FormItem } from '../../form-item';
import { Rule } from 'antd/es/form';
import { FormInput } from '../../../input';
import { TreeSelect } from '../../../select';
import { InverseFormItem } from 'pages/project-scheme/components/action-bar/form/add-edge/inverse-form-item';
import { VerticalSpace } from '../../../space/vertical-space';
import { Button } from '../../../button';
import { useDataSheetWrapper } from '../../../layouts/components/data-sheet/wrapper';
import React, { Dispatch, SetStateAction } from 'react';

const Wrapper = styled.div`
  width: 422px;
`;

type Props = {
  setCreateConnection: Dispatch<SetStateAction<{ selected?: string | undefined; isOpen: boolean } | undefined>>;
};

export const CreateConnection: React.FC<Props> = ({ setCreateConnection }) => {
  const { nodesList, nodeTypeId } = useDataSheetWrapper();
  const target = Form.useWatch('target_id', { preserve: true });

  return (
    <Wrapper>
      <Space size={8}>
        <Text>Add Connection</Text>
        <Tooltip title="Useful information" placement="right">
          <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
        </Tooltip>
      </Space>
      <FormItem
        name="connection_name"
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

      <FormItem name="source_id" label="Source">
        <TreeSelect
          defaultValue={nodeTypeId}
          disabled
          treeData={nodesList}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select source"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
        />
      </FormItem>
      <FormItem name="target_id" label="Target">
        <TreeSelect
          defaultValue={target}
          disabled
          treeData={nodesList}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select target"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
        />
      </FormItem>
      <InverseFormItem source={nodeTypeId} />
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
          <Button block type="text" onClick={() => setCreateConnection({ isOpen: false })}>
            Cancel
          </Button>
        </VerticalSpace>
      </FormItem>
    </Wrapper>
  );
};
