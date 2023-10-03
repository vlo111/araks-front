import React, { useEffect } from 'react';
import { Checkbox, Form, Space, Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { FormItem } from 'components/form/form-item';

export const InverseFormItem: React.FC = () => {
  const form = Form.useFormInstance();

  const sourceId = Form.useWatch('source_id', { preserve: true });
  const targetId = Form.useWatch('target_id', { preserve: true });

  useEffect(() => {
    if (sourceId !== targetId) {
      form.setFieldValue('inverse', false);
    }
  }, [form, sourceId, targetId]);

  return (
    <FormItem name="inverse" valuePropName="checked" initialValue={false}>
      <Checkbox disabled={sourceId !== targetId}>
        <Space>
          Inverse
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
      </Checkbox>
    </FormItem>
  );
};
