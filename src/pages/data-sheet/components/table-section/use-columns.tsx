import { ColumnsType } from 'antd/es/table';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { DataType } from './types';
import { ManageTypeProperty } from 'pages/data-sheet/components/table-section/type-property/manage-type-property';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { Skeleton, Space } from 'antd';
import { PropertyTypes } from 'components/form/property/types';
import { SecondaryText, Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

export const useColumns = () => {
  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();

  const { data, isInitialLoading } = useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === false),
  });

  if (isInitialLoading) {
    return [
      {
        title: <Skeleton paragraph={false} />,
        width: '100%',
      },
    ] as ColumnsType<DataType>;
  }

  const columns: ColumnsType<DataType> =
    data?.map((item) => ({
      title:
        item.ref_property_type_id === PropertyTypes.Connection ? (
          <Space>
            <Text color={COLORS.PRIMARY.BLUE}>{`${item.name}`}</Text>
            <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${item.ref_property_type_id})`}</SecondaryText>
          </Space>
        ) : item.default_image === true ? (
          <Space>
            <Text color={COLORS.PRIMARY.BLUE}>{`${item.name}`}</Text>
            <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${item.ref_property_type_id})`}</SecondaryText>
          </Space>
        ) : (
          <ManageTypeProperty
            propertyId={item.id}
            isDefault={item.default_property}
            canSetDefault={
              item.ref_property_type_id === 'text' && item.required_type === true && item.unique_type === true
            }
          >
            <Space>
              <Text color={COLORS.PRIMARY.BLUE}>{`${item.name}`}</Text>
              <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${item.ref_property_type_id})`}</SecondaryText>
            </Space>
          </ManageTypeProperty>
        ),
      width: `${item.name} (${item.ref_property_type_id})`.length * 13,
      className: 'node-property-column',
      dataIndex: item.name,
      key: item.id,
      ...(item.default_property ? { fixed: 'left' } : {}),
    })) || ([] as ColumnsType<DataType>);

  return columns;
};
