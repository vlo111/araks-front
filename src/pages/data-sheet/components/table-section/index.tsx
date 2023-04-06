import { Table } from 'antd';
import { useColumns } from './use-columns';
import { DataType } from './types';
import { useActions } from './table-actions';
import { VerticalButton } from 'components/button/vertical-button';
import { getTableHeight } from './constants';
import { HorizontalButton } from 'components/button/horizontal-button';

const dataSource: DataType[] = [...Array(20)].map((_, i) => ({
  key: i,
  column: 'operation',
}));

export const TableSection = () => {
  const columns = useColumns();
  const actions = useActions();

  const columnsAndAction = [...columns, ...actions];

  // make this with dispatch to change right position also
  // document.getElementById("container").scrollLeft += 200;

  return (
    <div id="container" style={{ overflow: 'hidden', width: '100%', height: getTableHeight, position: 'relative' }}>
      <VerticalButton />
      <HorizontalButton />
      <Table id="node-table" size="large" dataSource={dataSource} columns={columnsAndAction} pagination={false} />
    </div>
  );
};
