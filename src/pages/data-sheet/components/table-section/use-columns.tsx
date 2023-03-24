import { ColumnsType } from 'antd/es/table';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { DataType } from './types';
import { ManageTypeProperty } from 'pages/data-sheet/components/table-section/type-property/manage-type-property';

export const useColumns = () => {
  const { data } = useGetProjectNodeTypeProperties();

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
