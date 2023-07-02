import { useColumns } from './use-columns';
import { useEffect, useRef, useState } from 'react';
import { getTableHeight } from '../table-section/constants';
import { ConnectionTable } from 'components/table/connection-table';
import { useActions } from './table-actions';
import { VerticalConnectionButton } from 'components/button/vertical-connection-button';
import { useGetEdgesNodeData } from 'api/edges/use-get-edges-node-data';
import { PageParameters } from 'api/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { DataType } from '../table-section/types';
import { NodePagination } from 'components/pagination';
import { ManageConnection } from '../table-section/node/manage-connection';

const dataSource = (length: number): DataType[] =>
  [...Array(20 - length)].map((_, i) => ({
    key: i,
    column: 'operation',
  }));

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const ConnectionTableSection = () => {
  const [pageData, setPageData] = useState(initPageData);
  const [columnWidth, setColumnWidth] = useState(0);
  const [tableHead, setTableHead] = useState(0);
  const [rowData, setRowData] = useState<DataType[]>(dataSource(0));
  const tableRef = useRef<HTMLDivElement>(null);

  const { nodeTypeId } = useDataSheetWrapper();

  const { rowsData: data, count: pageCount } = useGetEdgesNodeData(pageData, nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: ({ rows: data }) => {
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

  useEffect(() => {
    if (columns.length) {
      let summaryHeight = document.querySelectorAll('.ant-table-thead')?.[0]?.clientHeight;
      const columnsProperty = document.querySelectorAll('.ant-table-tbody .ant-table-row');

      const firstFourElements = Array.from(columnsProperty).slice(0, data.length ?? 0);
      firstFourElements.forEach((column: Element) => {
        summaryHeight += column.clientHeight || 0;
      });

      setTableHead(summaryHeight);
    }
  }, [columns, data.length]);

  return (
    <div style={{ position: 'relative' }}>
      <ManageConnection tableHead={tableHead} tableHeight={tableRef.current?.offsetHeight} />
      <div
        id="container"
        style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}
        ref={tableRef}
      >
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
      {pageCount ? (
        <NodePagination
          total={pageCount}
          defaultPageSize={initPageData.size}
          pageSize={pageData.size}
          defaultCurrent={initPageData.page}
          current={pageData.page}
          onChange={(page) => {
            setPageData((prev) => ({ page, size: prev.size }));
          }}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setPageData({ page: current, size: size });
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
