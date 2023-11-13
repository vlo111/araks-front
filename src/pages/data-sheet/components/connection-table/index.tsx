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
import { EdgeViewButton } from './components/edge-view-button';
import { EdgesCreateProperties } from 'types/edges';
import { VerticalSpace } from 'components/space/vertical-space';
import { convertByType } from 'helpers/utils';
import { useIsPublicPage } from 'hooks/use-is-public-page';

const dataSource = (length: number, pageSize: number): DataType[] =>
  [...Array(pageSize - length)].map((_, i) => ({
    key: i,
    column: 'operation',
  }));

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const ConnectionTableSection = () => {
  const [pageData, setPageData] = useState(initPageData);
  const [columnWidth, setColumnWidth] = useState(0);
  const [, setTableHead] = useState(0);
  const [rowData, setRowData] = useState<DataType[]>(dataSource(0, DEFAULT_PAGE_SIZE));
  const tableRef = useRef<HTMLDivElement>(null);
  const isPublicPage = useIsPublicPage();

  const { nodeTypeId } = useDataSheetWrapper();

  const { rowsData: data, count: pageCount } = useGetEdgesNodeData(pageData, nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: ({ rows: data }) => {
      const rows = data.map((row) => ({
        target: <EdgeViewButton text={row.target.name} rowData={row} />,
        source: <EdgeViewButton text={row.source.name} rowData={row} />,
        ...row.properties?.reduce((curr: DataType, item: EdgesCreateProperties) => {
          return {
            ...curr,
            [item.edge_type_property_id]: convertByType(item.data, item.edge_type_property_type, true),
          };
        }, {} as DataType),
      }));
      setRowData([...(rows ? rows : []), ...dataSource(rows?.length || 0, pageData.size)] as DataType[]);
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
      let summaryHeight = document.querySelector('#connection-table .ant-table-thead')?.clientHeight || 0;
      if (!rowData) {
        setTableHead(summaryHeight);
        return;
      }
      const columnsProperty = document.querySelectorAll('#connection-table .ant-table-tbody .ant-table-row');

      const firstFourElements = Array.from(columnsProperty).slice(0, data.length ?? 0);
      firstFourElements.forEach((column: Element) => {
        summaryHeight += column.clientHeight || 0;
      });

      setTableHead(summaryHeight);
    }
  }, [columns, data.length, rowData]);

  return (
    <div style={{ position: 'relative' }}>
      <VerticalSpace size="large">
        <div
          id="container"
          style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}
          ref={tableRef}
        >
          {!isPublicPage && <VerticalConnectionButton columnWidth={columnWidth} />}
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
      </VerticalSpace>
    </div>
  );
};
