import { Col, Form, message, Row, Space } from 'antd';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from '../form-item';
import { ReactComponent as Connection } from 'components/icons/connection.svg';

import { Input } from 'components/input';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { ConnectionSourcesSearchResult } from 'types/node';
import { CloseOutlined } from '@ant-design/icons';
import { ConnectionAutocomplete } from 'components/input/connection-autocomplete';

type Props = {
  data: ProjectTypePropertyReturnData;
};

const WrapperConnection = styled(({ backgroundColor, ...props }) => <Space {...props} />)`
  padding: 2px 12px;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0px 4px 4px rgba(111, 111, 111, 0.16);

  border-radius: 4px;
  width: 100%;

  svg path {
    fill: ${COLORS.PRIMARY.WHITE};
  }
`;

const StyledFormItem = styled(FormItem)`
  label,
  .ant-row {
    width: 100%;
  }
`;

const ResultFormItem = styled(({ backgroundColor, ...props }) => <FormItem {...props} />)`
  background: ${(props) => props.backgroundColor};
  border-radius: 4px;

  svg {
    fill: ${COLORS.PRIMARY.WHITE};
  }

  .ant-input-prefix path {
    fill: ${COLORS.PRIMARY.WHITE};
  }

  .ant-input-affix-wrapper {
    border: none;
    border-radius: 4px;
    background: linear-gradient(
      135deg,
      ${(props) => props.backgroundColor} 1.28%,
      ${(props) => props.backgroundColor} 100%
    );
    box-shadow: 0px 4px 4px 0px rgba(111, 111, 111, 0.16);
    backdrop-filter: blur(2px);
  }

  .ant-input.ant-input-disabled {
    color: ${COLORS.PRIMARY.WHITE};
  }
`;

export const ConnectionType = ({ data }: Props) => {
  const form = useFormInstance();

  const handleSelect = (value: string, options: ConnectionSourcesSearchResult[]) => {
    const selectedRow = options?.find((row) => row.id === value);
    const existingData = form.getFieldValue(data.name);

    if (existingData?.length && existingData.find((data: NodeDataConnectionToSave) => data.target_id === value)) {
      message.warning(`THe option is already selected`);
      return;
    }
    if (selectedRow) {
      form.setFieldValue(data.name, [
        ...(form.getFieldValue(data.name) || []),
        {
          target_type_id: selectedRow.project_type_id,
          target_id: selectedRow.id,
          name: selectedRow.name,
          id: data.id,
        },
      ]);
    }
  };

  const label = (
    <Row justify="space-between">
      <Col>
        <Space>
          <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
          <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
        </Space>
      </Col>
      <Col>
        <WrapperConnection backgroundColor={data?.target?.color}>
          <Connection />
          <Text color={COLORS.PRIMARY.WHITE}>{data?.target?.name}</Text>
        </WrapperConnection>
      </Col>
    </Row>
  );

  return (
    <div style={{ textAlign: 'left' }}>
      <VerticalSpace>
        <StyledFormItem
          labelCol={{ span: 24 }}
          label={label}
          required={data.required_type}
          style={{ marginBottom: '0' }}
        >
          <ConnectionAutocomplete targetId={data.target_id || ''} handleSelect={handleSelect} />
        </StyledFormItem>
        <Form.List name={data.name}>
          {(fields, { add, remove }) => (
            <>
              <VerticalSpace>
                {fields.map((field) => (
                  <ResultFormItem
                    backgroundColor={data.source?.color}
                    key={field.name}
                    style={{ marginBottom: 0 }}
                    name={[field.name, 'name']}
                    rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
                  >
                    <Input
                      prefix={<Connection />}
                      disabled
                      suffix={<CloseOutlined onClick={() => remove(field.name)} />}
                    />
                  </ResultFormItem>
                ))}
              </VerticalSpace>
            </>
          )}
        </Form.List>
      </VerticalSpace>
    </div>
  );
};
