import { useEffect } from 'react';
import { InfoCircleFilled } from '@ant-design/icons';
import { Form, Space, Tooltip } from 'antd';
import { Checkbox } from 'components/checkbox';
import { FormItem } from '../form-item';
import { PropertyTypes } from './types';
import { PropertyMultipleDetails } from './property-multiple-details';

export const PropertyBasicDetails = () => {
  const dataType = Form.useWatch('ref_property_type_id');
  const multipleType = Form.useWatch('multiple_type');
  const form = Form.useFormInstance();

  const disableUnique = dataType !== PropertyTypes.Text;
  useEffect(() => {
    if (disableUnique || multipleType) {
      form.setFieldValue('unique_type', false);
    }
  }, [disableUnique, form, multipleType]);
  return (
    <>
      {dataType !== 'connection' && (
        <>
          <FormItem name="required_type" valuePropName="checked" initialValue={false}>
            <Checkbox>
              <Space>
                Required
                <Tooltip title="Useful information" placement="right">
                  <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
                </Tooltip>
              </Space>
            </Checkbox>
          </FormItem>
          <FormItem name="unique_type" valuePropName="checked" initialValue={false}>
            <Checkbox disabled={disableUnique}>
              <Space>
                Set field as unique
                <Tooltip title="Useful information" placement="right">
                  <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
                </Tooltip>
              </Space>
            </Checkbox>
          </FormItem>
          <PropertyMultipleDetails />
        </>
      )}
    </>
  );
};
