import { ReactNode, useEffect, useState } from 'react';
import { Form } from 'antd';
import { FormItem } from '../../form-item';
import { Select, TreeSelect } from '../../../select';
import { ProjectNodeTypePropertyReturnData } from 'api/types';
import { useDataSheetWrapper } from '../../../layouts/components/data-sheet/wrapper';
import { VerticalSpace } from '../../../space/vertical-space';
import { Button } from '../../../button';
import styled from 'styled-components';
import { SetCreateConnection } from '../add-type-property-form';

type Props = {
  dataTypeSelect: ReactNode;
  setCreateConnection: SetCreateConnection;
};

const AddNewButton = styled.div`
  background: none;
  border: none;
  color: #232f6a;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.12px;
  text-decoration-line: underline;
  cursor: pointer;
  user-select: none;
  margin: 1rem 0;
`;

export const ConnectionPropertyFormItems = ({ dataTypeSelect, setCreateConnection }: Props) => {
  const [hasNodeType, setHasNodeType] = useState(false);
  const form = Form.useFormInstance();
  const source = Form.useWatch('source_id', { preserve: true });
  const target = Form.useWatch('target_id', { preserve: true });
  const inverse = Form.useWatch('inverse', { preserve: true });
  const { nodesList, nodeTypeId } = useDataSheetWrapper();

  useEffect(() => {
    if (nodeTypeId) {
      form.setFieldValue('source_id', nodeTypeId);
      setHasNodeType(true);
    }

    return () => {
      setHasNodeType(false);
      form.resetFields(['source_id']);
    };
  }, [form, nodeTypeId]);

  useEffect(() => {
    if (target !== source && inverse) {
      form.setFieldValue('inverse', false);
    }
  }, [form, source, target, inverse]);

  return (
    <>
      <FormItem name="source_id" label="Source" rules={[{ required: true, message: 'Source is required' }]}>
        <TreeSelect
          disabled={hasNodeType}
          treeData={nodesList}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select source"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
          onSelect={(value, node) => {
            form.setFieldValue(
              'source_attribute_id',
              node.properties.find((item: ProjectNodeTypePropertyReturnData) => item.name === 'name').id
            );
          }}
        />
      </FormItem>
      <FormItem name="target_id" label="Target" rules={[{ required: true, message: 'Target is required' }]}>
        <TreeSelect
          treeData={nodesList}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Select target"
          allowClear
          treeDefaultExpandAll
          fieldNames={{ value: 'key' }}
          onSelect={(value, node) => {
            form.setFieldValue(
              'target_attribute_id',
              node.properties.find((item: ProjectNodeTypePropertyReturnData) => item.name === 'name').id
            );
          }}
        />
      </FormItem>
      {dataTypeSelect}
      <FormItem
        name="edit_connection_name"
        label="Connection Name"
        rules={[{ required: true, message: 'Node property data type is required' }]}
      >
        <Select style={{ width: '100%' }} placeholder="Please select" fieldNames={{ value: 'id', label: 'name' }} />
      </FormItem>
      <AddNewButton
        onClick={() =>
          setCreateConnection({
            isOpen: true,
          })
        }
      >
        +Add New Connection
      </AddNewButton>
      <FormItem>
        <VerticalSpace>
          <Button block type="primary" htmlType="submit">
            Save
          </Button>
          <Button block type="text">
            Cancel
          </Button>
        </VerticalSpace>
      </FormItem>
    </>
  );
};
