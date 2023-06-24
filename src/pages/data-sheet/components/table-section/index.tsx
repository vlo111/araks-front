import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useColumns } from './use-columns';
import { DataType } from './types';
import { useActions } from './table-actions';
import { getTableHeight } from './constants';
import { VerticalButton } from 'components/button/vertical-button';
import { ManageNode } from './node/manage-node';
import { useGetTypeNodes } from 'api/node/use-get-type-nodes';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { NodePropertiesValues } from 'types/node';
import { getColumnValue, showAvatar } from './node/utils';
import { ViewDatasheetProvider } from 'context/datasheet-view-vontext';
import { NodePagination } from 'components/pagination';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { PageParameters } from 'api/types';
import { NodeViewButton } from './node/node-view-button';

const dataSource = (length: number): DataType[] =>
  [...Array(20 - length)].map((_, i) => ({
    key: i,
    column: 'operation',
  }));

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const TableSection = () => {
  const [pageData, setPageData] = useState(initPageData);
  const [columnWidth, setColumnWidth] = useState(0);
  const [tableHead, setTableHead] = useState(0);
  const [rowData, setRowData] = useState<DataType[]>(dataSource(0));

  const { nodeTypeId } = useDataSheetWrapper();
  const { rowsData: data, count: pageCount } = useGetTypeNodes(pageData, nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: ({ rows: data }) => {
      const rows = data.map((row) =>
        row.properties?.reduce(
          (curr: DataType, item: NodePropertiesValues) => {
            return {
              ...curr,
              key: row.id,
              [item.nodeTypeProperty.name]: getColumnValue(item, row),
            };
          },
          {
            name: <NodeViewButton text={row.name} rowData={row} />,
            node_icon: showAvatar(row.default_image),
          } as DataType
        )
      );

      setRowData([...(rows ? rows : []), ...dataSource(rows?.length || 0)] as DataType[]);
    },
  });

  const columns = useColumns();
  const actions = useActions();

  useEffect(() => {
    if (columns.length) {
      let summaryWidth = 0;
      const columnsProperty = document.querySelectorAll('.ant-table-thead .node-property-column');

      columnsProperty.forEach((column: Element) => {
        summaryWidth += column.clientWidth;
      });

      setColumnWidth(summaryWidth);
    }
  }, [columns, columns.length]);

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
      <ManageNode tableHead={tableHead} />
      <div
        id="container"
        className="content-datasheet"
        style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}
      >
        <VerticalButton columnWidth={columnWidth} />
        <ViewDatasheetProvider>
          <Table
            id="node-table"
            size="large"
            bordered
            dataSource={rowData}
            columns={[...columns, ...actions]}
            pagination={false}
            scroll={{ x: 'max-content', scrollToFirstRowOnChange: true }}
          />
        </ViewDatasheetProvider>
      </div>
      {pageCount ? (
        <NodePagination
          total={pageCount}
          defaultPageSize={initPageData.size}
          pageSize={initPageData.size}
          defaultCurrent={initPageData.page}
          current={pageData.page}
          onChange={(page) => {
            setPageData({ page, size: DEFAULT_PAGE_SIZE });
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
