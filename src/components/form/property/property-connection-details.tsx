import { InfoCircleFilled } from '@ant-design/icons';
import { Form, Space, Tooltip } from 'antd';
import { Checkbox } from 'components/checkbox';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { TreeSelect } from 'components/select';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useEffect, useState } from 'react';
import { FormItem } from '../form-item';

export const PropertyConnectionDetails = () => {
  const [hasNodeType, setHasNodeType] = useState(false);
  const form = Form.useFormInstance();
  const dataType = Form.useWatch('ref_property_type_id');
  const { nodesList, nodeTypeId } = useDataSheetWrapper();
  const { state } = useTypeProperty();

  useEffect(() => {
    if (nodeTypeId && state.isConnectionType !== true) {
      form.setFieldValue('source_id', nodeTypeId);
      setHasNodeType(true);
    }
  }, [form, nodeTypeId, state.isConnectionType]);

  return (
    <>
      {dataType === 'connection' && (
        <>
          <FormItem name="source_id" label="Source" rules={[{ required: true, message: 'Source is required' }]}>
            <TreeSelect
              disabled={hasNodeType}
              treeData={nodesList}
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
              treeData={nodesList}
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
        </>
      )}
    </>
  );
};
