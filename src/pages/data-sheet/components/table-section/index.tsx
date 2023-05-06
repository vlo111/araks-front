import { Table } from 'antd';
import { useColumns } from './use-columns';
import { DataType } from './types';
import { useActions } from './table-actions';
import { getTableHeight } from './constants';
import { HorizontalButton } from 'components/button/horizontal-button';
import { useEffect, useState } from 'react';
import { VerticalButton } from 'components/button/vertical-button';

const dataSource: DataType[] = [...Array(20)].map((_, i) => ({
  key: i,
  column: 'operation',
}));

export const TableSection = () => {
  const [tableHead, setTableHead] = useState(0);
  const [columnWidth, setColumnWidth] = useState(0);
  const columns = useColumns();
  const actions = useActions();

  useEffect(() => {
    if (columns.length) {
      setTableHead(document.querySelectorAll('.ant-table-thead')?.[0]?.clientHeight);
      let summaryWidth = 0;
      const columnsProperty = document.querySelectorAll('.ant-table-thead .node-property-column');

      columnsProperty.forEach((column: Element) => {
        summaryWidth += column.clientWidth;
      });

      setColumnWidth(summaryWidth);
    }
  }, [columns, columns.length]);

  return (
    <div id="container" style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}>
      <VerticalButton columnWidth={columnWidth} />
      <HorizontalButton tableHead={tableHead} />
      <Table
        id="node-table"
        size="large"
        bordered
        dataSource={dataSource}
        columns={[...columns, ...actions]}
        pagination={false}
        scroll={{ x: '100vw' }}
      />
    </div>
  );
};
