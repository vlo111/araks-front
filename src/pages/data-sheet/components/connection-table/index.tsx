import { useColumns } from './use-columns';
import { useEffect, useState } from 'react';
import { getTableHeight } from '../table-section/constants';
import { ConnectionTable } from 'components/table/connection-table';
import { useActions } from './table-actions';
import { VerticalConnectionButton } from 'components/button/vertical-connection-button';

const dataSource = [...Array(20)].map((_, i) => ({
  key: i,
  label: '',
}));

export const ConnectionTableSection = () => {
  const [columnWidth, setColumnWidth] = useState(0);
  const columns = useColumns();
  const actions = useActions();

  useEffect(() => {
    if (columns.length) {
      const columns = document.querySelectorAll('.ant-table-thead .connection-column');
      let summaryWidth = 0;

      columns.forEach((column: Element) => {
        summaryWidth += column.clientWidth;
      });

      setColumnWidth(summaryWidth);
    }
  }, [columns.length, columns]);

  return (
    <div id="container" style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}>
      <VerticalConnectionButton columnWidth={columnWidth} />
      <ConnectionTable
        id="connection-table"
        size="large"
        bordered
        dataSource={dataSource}
        columns={[...columns, ...actions]}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
