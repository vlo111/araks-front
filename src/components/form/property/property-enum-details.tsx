import { Form } from 'antd';
import { FormItem } from '../form-item';
import { VerticalSpace } from 'components/space/vertical-space';
import { TypeWrapper } from '../type/type-wrapper';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { Input } from 'components/input';
import styled from 'styled-components';
import { Button } from 'components/button';
import { SecondaryText } from 'components/typography';

const StyledButton = styled(Button)`
  padding: 0;
  height: auto;
  border: 0;

  span {
    text-decoration: underline;
    font-weight: 600;
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;
  border: 1px solid #808080;
  background: linear-gradient(92deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);
  padding: 1rem;
`;

export const PropertyEnumDetails = () => {
  const dataType = Form.useWatch('ref_property_type_id');
  // const form = Form.useFormInstance();

  return (
    <>
      {dataType === 'enum' && (
        <Form.List name={'enum'} initialValue={['123', '456']}>
          {(fields, { add, remove }) => (
            <>
              <Wrapper>
                <FormItem required={dataType} style={{ marginBottom: '0' }}>
                  <VerticalSpace style={{ width: '90%' }}>
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
                          rules={[{ required: dataType, message: VALIDATE_MESSAGES.required }]}
                        >
                          <Input />
                        </FormItem>
                      </TypeWrapper>
                    ))}
                  </VerticalSpace>
                </FormItem>
              </Wrapper>

              <StyledButton type="link" onClick={() => add(null)}>
                <SecondaryText color={COLORS.PRIMARY.BLUE}>+ Add Variant</SecondaryText>
              </StyledButton>
            </>
          )}
        </Form.List>
      )}
    </>
  );
};
