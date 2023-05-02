import { useColumns } from './use-columns';
import { VerticalButton } from 'components/button/vertical-button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { useEffect, useState } from 'react';
import { getTableHeight } from '../table-section/constants';
import { ConnectionTable } from 'components/table/connection-table';
import { TypePropertyActionKind } from '../table-section/types';
import { useActions } from './table-actions';

const dataSource = [...Array(20)].map((_, i) => ({
  key: i,
  label: '',
}));

export const ConnectionTableSection = () => {
  const [tableHead, setTableHead] = useState(0);
  const [columnWidth, setColumnWidth] = useState(0);
  const columns = useColumns();
  const actions = useActions();

  useEffect(() => {
    if (columns.length) {
      setTableHead(document.querySelectorAll('.ant-table-thead')?.[0]?.clientHeight);
      const columns = document.querySelectorAll('.ant-table-thead .connection-column');
      let summaryWidth = 0;

      columns.forEach((column: Element) => {
        summaryWidth += column.clientWidth;
      });
      // eslint-disable-next-line no-console
      console.log('summaryWidth', summaryWidth, columns.length);
      setColumnWidth(summaryWidth);
    }
  }, [columns.length, columns]);

  // eslint-disable-next-line no-console
  console.log('columns', columns);

  return (
    <div id="container" style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}>
      <VerticalButton columnWidth={columnWidth} type={TypePropertyActionKind.ADD_CONNECTION_TYPE_START} />
      <HorizontalButton tableHead={tableHead} />
      <ConnectionTable
        id="connection-table"
        size="large"
        bordered
        dataSource={dataSource}
        columns={[...columns, ...actions]}
        pagination={false}
      />
    </div>
  );
};
