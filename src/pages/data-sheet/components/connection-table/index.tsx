import { useColumns } from './use-columns';
import { VerticalButton } from 'components/button/vertical-button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { useEffect, useState } from 'react';
import { getTableHeight } from '../table-section/constants';
import { ConnectionTable } from 'components/table/connection-table';

const dataSource = [...Array(20)].map((_, i) => ({
  key: i,
  label: '',
}));

export const ConnectionTableSection = () => {
  const [tableHead, setTableHead] = useState(0);
  const [columnWidth, setColumnWidth] = useState(0);
  const columns = useColumns();

  useEffect(() => {
    if (columns.length) {
      setTableHead(document.querySelectorAll('.ant-table-thead')?.[0]?.clientHeight);
      const columns = document.querySelectorAll('.ant-table-thead .connection-column');
      let summaryWidth = 0;

      columns.forEach((column: Element) => {
        summaryWidth += column.clientWidth;
      });
      setColumnWidth(summaryWidth);
    }
  }, [columns.length]);

  return (
    <div id="container" style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}>
      <VerticalButton columnWidth={columnWidth} />
      <HorizontalButton tableHead={tableHead} />
      <ConnectionTable
        id="connection-table"
        size="large"
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
