import { Form, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { Datepicker } from 'components/datepicker';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import dayjs from 'dayjs';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { FormItem } from '../form-item';
import { TypeWrapper } from './type-wrapper';

type Props = {
  data: ProjectTypePropertyReturnData;
};

const dateFormat = 'DD/MM/YYYY HH:mm';

export const DateTimeType = ({ data }: Props) => {
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
    </Space>
  );

  return (
    <div style={{ textAlign: 'left' }}>
      <Form.List name={data.name} initialValue={['']}>
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
                      name={[field.name]}
                      key={field.key}
                      rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
                    >
                      <Datepicker
                        format={dateFormat}
                        style={{ width: '100%' }}
                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm') }}
                      />
                    </FormItem>
                  </TypeWrapper>
                ))}
              </VerticalSpace>
            </FormItem>
            {data.multiple_type === true && <AddNewFieldButton onClick={() => add('')} />}
          </>
        )}
      </Form.List>
    </div>
  );
};
