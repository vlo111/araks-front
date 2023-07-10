import { Col, message, Row, Space } from 'antd';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from '../form-item';
import { ReactComponent as Connection } from 'components/icons/connection.svg';

import { ConnectionSourcesSearchResult } from 'types/node';
import { ConnectionAutocomplete } from 'components/input/connection-autocomplete';
import { SelectConnectionFormItem } from 'components/form-item/select-connection-form-item';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';

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

export const getConnectionFormName = (name: string, id: string) => `${name}-${id}`;

export const ConnectionType = ({ data }: Props) => {
  const form = useFormInstance();
  const formName = getConnectionFormName(data.name, data.id);

  const handleSelect = (value: string, options: ConnectionSourcesSearchResult[]) => {
    const selectedRow = options?.find((row) => row.id === value);

    const existingData = form.getFieldValue(formName);

    if (existingData?.length && existingData.find((data: NodeDataConnectionToSave) => data.target_id === value)) {
      message.warning(`THe option is already selected`);
      return;
    }

    if (selectedRow) {
      form.setFieldValue(formName, [
        ...(form.getFieldValue(formName) || []),
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
        <SelectConnectionFormItem formName={formName} color={data.source?.color} isRequired={data.required_type} />
      </VerticalSpace>
    </div>
  );
};
