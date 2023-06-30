import { useColumns } from './use-columns';
import { useEffect, useState } from 'react';
import { getTableHeight } from '../table-section/constants';
import { ConnectionTable } from 'components/table/connection-table';
import { useActions } from './table-actions';
import { VerticalConnectionButton } from 'components/button/vertical-connection-button';
import { useGetEdgesNodeData } from 'api/edges/use-get-edges-node-data';
import { PageParameters } from 'api/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { DataType } from '../table-section/types';

const dataSource = (length: number): DataType[] =>
  [...Array(20 - length)].map((_, i) => ({
    key: i,
    column: 'operation',
  }));

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const ConnectionTableSection = () => {
  const [pageData] = useState(initPageData);
  const [columnWidth, setColumnWidth] = useState(0);
  const [rowData, setRowData] = useState<DataType[]>(dataSource(0));

  const { nodeTypeId } = useDataSheetWrapper();

  useGetEdgesNodeData(pageData, nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: (data) => {
      const rows = data.map((row) => ({ target: row.target.name, source: row.source.name }));
      setRowData([...(rows ? rows : []), ...dataSource(rows?.length || 0)] as DataType[]);
    },
  });
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
        dataSource={rowData}
        columns={[...columns, ...actions]}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
