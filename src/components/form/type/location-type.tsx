import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { LocationInput as Location } from 'components/location';
import { Location as LocationPropType } from 'components/modal/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from '../form-item';

const Wrapper = styled.div`
  position: relative;

  .dynamic-delete-button {
    position: absolute;
    right: -30px;
    top: 10px;
  }
`;

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
                    <Wrapper key={field.name}>
                      <FormItem
                        style={{ marginBottom: 0 }}
                        name={[field.name, 'address']}
                        key={field.key}
                        rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
                      >
                        <Location onChangeValue={(location: LocationPropType) => onChangeValue(location, field.name)} />
                      </FormItem>
                      {fields.length > 1 && field.name >= 1 ? (
                        <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                      ) : null}
                    </Wrapper>
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
