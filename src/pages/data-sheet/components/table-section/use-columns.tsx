import { ColumnsType } from 'antd/es/table';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { DataType } from './types';
import { ManageTypeProperty } from 'pages/data-sheet/components/table-section/type-property/manage-type-property';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { Skeleton } from 'antd';

export const useColumns = () => {
  const { nodeTypeId } = useDataSheetWrapper();
  const { data, isLoading } = useGetProjectNodeTypeProperties(nodeTypeId, { enabled: !!nodeTypeId });

  if (isLoading) {
    return [
      {
        title: <Skeleton paragraph={false} />,
        width: '100%',
      },
    ] as ColumnsType<DataType>;
  }

  const columns: ColumnsType<DataType> =
    data?.map((item) => ({
      title: (
        <ManageTypeProperty propertyId={item.id}>{`${item.name} (${item.ref_property_type_id})`}</ManageTypeProperty>
      ),
      width: 200,
      dataIndex: 'address',
      key: item.id,
    })) || ([] as ColumnsType<DataType>);

  return columns;
};
