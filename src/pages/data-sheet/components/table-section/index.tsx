import { Table } from 'antd';
import { useColumns } from './use-columns';
import { DataType } from './types';
import { useActions } from './table-actions';
import { VerticalButton } from 'components/button/vertical-button';

const dataSource: DataType[] = [...Array(20)].map((_, i) => ({
  key: i,
  column: 'operation',
}));

export const TableSection = () => {
  const columns = useColumns();
  const actions = useActions();

  const columnsAndAction = [...columns, ...actions];

  return (
    <div style={{ overflow: 'auto' }}>
      <VerticalButton />
      <Table dataSource={dataSource} columns={columnsAndAction} pagination={false} />
    </div>
  );
};
