import { ColumnsType } from 'antd/es/table';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { DataType } from './types';
import { ManageTypeProperty } from 'pages/data-sheet/components/table-section/type-property/manage-type-property';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { Skeleton } from 'antd';
import { PropertyTypes } from 'components/form/property/types';

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
          <>{`${item.name} (${item.ref_property_type_id})`}</>
        ) : (
          <ManageTypeProperty
            propertyId={item.id}
            isDefault={item.default_proprty}
            canSetDefault={
              item.ref_property_type_id === 'text' && item.required_type === true && item.unique_type === true
            }
          >{`${item.name} (${item.ref_property_type_id})`}</ManageTypeProperty>
        ),
      width: `${item.name} (${item.ref_property_type_id})`.length * 15,
      className: 'node-property-column',
      dataIndex: item.name,
      key: item.id,
      ...(item.default_proprty ? { fixed: 'left' } : {}),
    })) || ([] as ColumnsType<DataType>);

  return columns;
};
