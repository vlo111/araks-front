import { Form, Space } from 'antd';
import { Checkbox } from 'components/checkbox';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
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
          <UsefulInformationTooltip infoText="Can have multiple rows" />
        </Space>
      </Checkbox>
    </FormItem>
  );
};
