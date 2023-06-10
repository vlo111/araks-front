import { InfoCircleFilled } from '@ant-design/icons';
import { Form, Space, Tooltip } from 'antd';
import { Checkbox } from 'components/checkbox';
import { useEffect } from 'react';
import { FormItem } from '../form-item';
import { PropertyTypes } from './types';

export const PropertyMultipleDetails = () => {
  const refPropertyType = Form.useWatch('ref_property_type_id');
  const uniqueType = Form.useWatch('unique_type');
  const form = Form.useFormInstance();
  const isDefaultProprty = form.getFieldValue('default_property');

  const disableMultiple =
    refPropertyType === PropertyTypes.RichText || refPropertyType === PropertyTypes.Boolean || isDefaultProprty;
  useEffect(() => {
    if (disableMultiple || uniqueType) {
      form.setFieldValue('multiple_type', false);
    }
  }, [disableMultiple, form, uniqueType]);
  return (
    <FormItem name="multiple_type" valuePropName="checked" initialValue={false}>
      <Checkbox disabled={disableMultiple}>
        <Space>
          Multiple
          <Tooltip title="Useful information" placement="right">
            <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
          </Tooltip>
        </Space>
      </Checkbox>
    </FormItem>
  );
};
