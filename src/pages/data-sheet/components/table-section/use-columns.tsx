import { ColumnsType } from 'antd/es/table';
import { useGetProjectNoteTypeProperties } from 'api/project-node-type-property/use-get-project-note-type-properties';
import { DataType } from './types';
import { EditTypeProprty } from 'components/button/edit-type-property';

export const useColumns = () => {
  const { data } = useGetProjectNoteTypeProperties();

  const columns: ColumnsType<DataType> =
    data?.map((item) => ({
      title: <EditTypeProprty propertyId={item.id}>{`${item.name} (${item.ref_property_type_id})`}</EditTypeProprty>,
      width: 200,
      dataIndex: 'address',
      key: item.id,
    })) || ([] as ColumnsType<DataType>);

  return columns;
};
