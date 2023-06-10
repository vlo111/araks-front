import { Form, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { LocationInput as Location } from 'components/location';
import { Location as LocationPropType } from 'components/modal/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { FormItem } from '../form-item';
import { TypeWrapper } from './type-wrapper';

type Props = {
  data: ProjectTypePropertyReturnData;
};

export const LocationType = ({ data }: Props) => {
  // const form = Form.useFormInstance();
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
    </Space>
  );

  const onChangeValue = ({ address, ...location }: LocationPropType, fieldName?: number) => {
    // if (fieldName) {
    //   form.setFieldsValue({
    //     [(data.name, fieldName, 'address')]: address,
    //     [(data.name, fieldName, 'location')]: {
    //       latitude: location.lat,
    //       longitude: location.lng,
    //     },
    //   });
    //   return;
    // }
    // form.setFieldValue(data.name, {
    //   address,
    //   location: {
    //     latitude: location.lat,
    //     longitude: location.lng,
    //   },
    // });
  };

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
                        name={[field.name, 'address']}
                        key={field.key}
                        rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
                      >
                        <Location onChangeValue={(location: LocationPropType) => onChangeValue(location, field.name)} />
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
          rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
        >
          <Location onChangeValue={onChangeValue} />
        </FormItem>
      )}
    </div>
  );
};
