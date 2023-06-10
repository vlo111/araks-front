import { Form, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { Url } from 'components/url';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from '../form-item';
import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';

type Props = {
  data: ProjectTypePropertyReturnData;
};

const WrapperConnection = styled(Space)`
  padding: 2px 12px;
  background: linear-gradient(95.36deg, rgba(242, 114, 129, 0.6) 5.15%, rgba(242, 114, 129, 0.6) 100%);
  box-shadow: 0px 4px 4px rgba(111, 111, 111, 0.16);
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 4px;
  width: 100%;

  svg path {
    fill: ${COLORS.PRIMARY.WHITE};
  }
`;

export const ConnectionType = ({ data }: Props) => {
  const { dataList } = useDataSheetWrapper();
  // eslint-disable-next-line no-console
  console.log('data', data, dataList);
  const label = (
    <Space style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
      <Space>
        <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
        <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
      </Space>
      <WrapperConnection>
        <Connection />
        <Text color={COLORS.PRIMARY.WHITE}>Some text</Text>
      </WrapperConnection>
    </Space>
  );

  return (
    <div style={{ textAlign: 'left' }}>
      {data.multiple_type === true ? (
        <Form.List name={data.name} initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              <FormItem
                labelCol={{ span: 24 }}
                label={label}
                required={data.required_type}
                style={{ marginBottom: '0' }}
              >
                <VerticalSpace>
                  {fields.map((field) => (
                    <FormItem
                      style={{ marginBottom: 0 }}
                      name={[field.name, 'name']}
                      key={field.key}
                      rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
                    >
                      <Url />
                    </FormItem>
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
          <Url />
        </FormItem>
      )}
    </div>
  );
};
