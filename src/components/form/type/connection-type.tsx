import { Col, message, Row, Space } from 'antd';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from '../form-item';
import { ReactComponent as InComeConnection } from 'components/icons/in-come.svg';

import { ConnectionSourcesSearchResult, NodeEdges } from 'types/node';
import { ConnectionAutocomplete } from 'components/input/connection-autocomplete';
import { SelectConnectionFormItem } from 'components/form-item/select-connection-form-item';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { groupedData } from 'pages/data-sheet/components/table-section/node/utils';

type Props = {
  data: ProjectTypePropertyReturnData;
  nodeTypeId?: string;
  nodeId?: string;
  edges?: NodeEdges[] | undefined;
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

export const ConnectionType = ({ nodeId, nodeTypeId, data, edges }: Props) => {
  const form = useFormInstance();
  const formName = getConnectionFormName(data.name, data.id);

  const handleSelect = (value: string, options: ConnectionSourcesSearchResult[]) => {
    const selectedRow = options?.find((row) => row.id === value);

    const existingData = form.getFieldValue(formName);

    if (
      existingData?.length &&
      existingData.find((data: NodeDataConnectionToSave) => value === data.source_id || value === data.target_id)
    ) {
      message.warning(`THe option is already selected`);
      return;
    }

    if (selectedRow) {
      const groupList = groupedData(edges ?? []);

      const connectionFieldsData: {
        [p: string]: { target_type_id: string; name: string; target_id: string; id: string; rowId: string }[];
      } = Object.entries(groupList).reduce((acc, [key, item]) => {
        return {
          ...acc,
          [key]: item.map((row) => ({
            rowId: row.id,
            id: row.edgeTypes.id,
            name: nodeTypeId !== data.source_id ? row.source.name : row.target.name,
            source_id: row.source_id,
            source_type_id: row.source_type_id,
            target_id: row.target_id,
            target_type_id: row.target_type_id,
          })),
        };
      }, {});

      const item = connectionFieldsData[formName]?.find(
        (c) => data.id === c.id && selectedRow.id === c.target_id && selectedRow.project_type_id === c.target_type_id
      );

      const isSource = nodeTypeId !== data.source_id;

      form.setFieldValue(formName, [
        ...(form.getFieldValue(formName) || []),
        {
          source_id: isSource ? selectedRow.id : nodeId,
          source_type_id: isSource ? data.target_id : data.source_id,
          target_id: isSource ? nodeId : selectedRow.id,
          target_type_id: isSource ? data.source_id : data.target_id,
          name: selectedRow.name,
          id: data.id,
          rowId: item?.rowId,
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
        <WrapperConnection backgroundColor={nodeTypeId !== data.source_id ? data?.source?.color : data?.target?.color}>
          <InComeConnection style={{ transform: `rotate(${nodeTypeId !== data.source_id ? 180 : 0}deg)` }} />
          <Text color={COLORS.PRIMARY.WHITE}>
            {nodeTypeId !== data.source_id ? data?.source?.name : data?.target?.name}
          </Text>
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
          <ConnectionAutocomplete
            targetId={nodeTypeId !== data.source_id ? data.source_id ?? '' : data.target_id ?? ''}
            handleSelect={handleSelect}
          />
        </StyledFormItem>
        <SelectConnectionFormItem
          formName={formName}
          isSource={nodeTypeId !== data.source_id}
          color={nodeTypeId !== data.source_id ? data.source?.color : data.target?.color}
          isRequired={data.required_type}
        />
      </VerticalSpace>
    </div>
  );
};
