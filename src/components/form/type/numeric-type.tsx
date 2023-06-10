import { Form, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { InputNumber } from 'components/input-number';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { FormItem } from '../form-item';
import { TypeWrapper } from './type-wrapper';
// import { PropertyTypes } from '../property/types';

type Props = {
  data: ProjectTypePropertyReturnData;
};

export const NumericType = ({ data }: Props) => {
  // let propByType = {};
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
    </Space>
  );

  // const formatInputValue = (value: number | string | undefined) => {
  //   if (value === '') {
  //     return '';
  //   }
  //   return String(parseInt(String(value), 10));
  // };

  // const parseInputValue = (value: number | string | undefined) => {
  //   if (isNaN(Number(value))) {
  //     return undefined;
  //   }
  //   return parseInt(String(value), 10);
  // };

  // if (data.ref_property_type_id === PropertyTypes.Integer) {
  //   propByType = {
  //     formatter: formatInputValue,
  //     parser: parseInputValue,
  //   };
  // }

  // const validateInputValue = (rule: unknown, value: unknown, callback: (v: string) => void) => {
  //   if (value && !Number.isInteger(value) && data.ref_property_type_id === PropertyTypes.Integer) {
  //     callback('Please enter an integer');
  //   } else {
  //     callback('');
  //   }
  // };

  return (
    <div style={{ textAlign: 'left' }}>
      {data.multiple_type === true ? (
        <Form.List name={data.name} initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              <FormItem label={label} required={data.required_type} style={{ marginBottom: '0' }}>
                <VerticalSpace>
                  {fields.map((field) => (
                    <TypeWrapper
                      key={field.name}
                      fieldLength={fields.length}
                      field={field}
                      onRemove={() => remove(field.name)}
                    >
                      <FormItem
                        style={{ marginBottom: 0 }}
                        name={[field.name, 'name']}
                        key={field.key}
                        // rules={[
                        //   { required: data.required_type, message: VALIDATE_MESSAGES.required },
                        //   { validator: validateInputValue },
                        // ]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </FormItem>
                    </TypeWrapper>
                  ))}
                </VerticalSpace>
              </FormItem>
              <AddNewFieldButton onClick={add} />
            </>
          )}
        </Form.List>
      ) : (
        <FormItem
          key={data.id}
          name={data.name}
          label={label}
          // rules={[
          //   { required: data.required_type, message: VALIDATE_MESSAGES.required },
          //   { validator: validateInputValue },
          // ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </FormItem>
      )}
    </div>
  );
};
