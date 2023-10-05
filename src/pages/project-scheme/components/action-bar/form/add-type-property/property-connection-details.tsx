import { InfoCircleFilled } from '@ant-design/icons';
import { Form, Space, Tooltip } from 'antd';
import { Checkbox } from 'components/checkbox';
import { TreeSelect } from 'components/select';
import { useEffect, useMemo, useState } from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { FormItem } from 'components/form/form-item';
import { PropertyTypes } from 'components/form/property/types';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';

type Props = {
  typeId: string;
};

export const PropertyConnectionDetailsSchema = ({ typeId }: Props) => {
  const [hasNodeType, setHasNodeType] = useState(false);
  const form = Form.useFormInstance();

  const source = Form.useWatch('source_id', { preserve: true });
  const target = Form.useWatch('target_id', { preserve: true });

  const dataType = Form.useWatch('ref_property_type_id', { preserve: true });

  const { nodes } = useSchema() ?? {};

  const treeNodes = useMemo(() => createNodesTree(nodes), [nodes]);

  useEffect(() => {
    if (typeId && dataType === PropertyTypes.Connection) {
      form.setFieldValue('source_id', typeId);
      setHasNodeType(true);
    }

    return () => {
      setHasNodeType(false);
      form.resetFields(['source_id']);
    };
  }, [form, dataType, typeId]);

  useEffect(() => {
    if (target !== source) {
      form.setFieldValue('inverse', false);
    }
  }, [form, source, target]);

  return (
    <>
      {dataType === PropertyTypes.Connection && (
        <>
          <FormItem name="source_id" label="Source" rules={[{ required: true, message: 'Source is required' }]}>
            <TreeSelect
              disabled={hasNodeType}
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
          <FormItem name="inverse" valuePropName="checked" initialValue={false}>
            <Checkbox disabled={target !== source}>
              <Space>
                Inverse
                <Tooltip title="Useful information" placement="right">
                  <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
                </Tooltip>
              </Space>
            </Checkbox>
          </FormItem>
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
        </>
      )}
    </>
  );
};
