import { useEffect, useRef, useState } from 'react';
import { Spin, Table } from 'antd';
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
import { ConnectionColumnValue } from './node/connection-column-value';
import { VerticalSpace } from 'components/space/vertical-space';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { ImportDrawer } from 'components/drawer/import-drawer';
import { ImportStepsDrawer } from 'components/drawer/import-steps-drawer';
import { useIsPublicPage } from 'hooks/use-is-public-page';

const dataSource = (length: number, pageSize: number): DataType[] =>
  [...Array(pageSize - length)].map((_, i) => ({
    key: i,
    column: 'operation',
  }));

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const TableSection = () => {
  const [pageData, setPageData] = useState(initPageData);
  const [columnWidth, setColumnWidth] = useState(0);
  const [tableHead, setTableHead] = useState(0);
  const [rowData, setRowData] = useState<DataType[]>(dataSource(0, DEFAULT_PAGE_SIZE));
  const tableRef = useRef<HTMLDivElement>(null);
  const isPublicPage = useIsPublicPage();

  const { nodeTypeId } = useDataSheetWrapper();
  const {
    rowsData: data,
    count: pageCount,
    isLoading,
  } = useGetTypeNodes(pageData, nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: ({ rows: data, count }) => {
      const rows = data.map((row) => ({
        ...row.properties?.reduce(
          (curr: DataType, item: NodePropertiesValues) => {
            return {
              ...curr,
              [item.nodeTypeProperty.name + item.nodeTypeProperty.id]: getColumnValue(item, row),
            };
          },
          {
            key: row.id,
            name: <NodeViewButton text={row.name} rowData={row} />,
            node_icon: showAvatar(row.default_image),
          } as DataType
        ),
        ...row.edges?.reduce((curr: DataType, item) => {
          return {
            ...curr,
            [item.edgeTypes.name + item.edgeTypes.id]: (
              <ConnectionColumnValue
                itemName={getConnectionFormName(item.edgeTypes.name, item.edgeTypes.id)}
                row={row}
              />
            ),
          };
        }, {} as DataType),
      }));

      setRowData([
        ...(rows ? rows : []),
        ...dataSource(
          rows?.length || 0,
          count < pageData.size ? (count > DEFAULT_PAGE_SIZE ? count : DEFAULT_PAGE_SIZE) : pageData.size
        ),
      ] as DataType[]);
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
      let summaryHeight = document.querySelector('#node-table .ant-table-thead')?.clientHeight || 0;
      if (!rowData) {
        setTableHead(summaryHeight);
        return;
      }
      const columnsProperty = document.querySelectorAll('#node-table .ant-table-tbody .ant-table-row');

      const firstFourElements = Array.from(columnsProperty).slice(0, data.length ?? 0);
      firstFourElements.forEach((column: Element) => {
        summaryHeight += column.clientHeight || 0;
      });
      setTableHead(summaryHeight);
    }
  }, [columns, data.length, rowData]);

  return (
    <div style={{ position: 'relative' }}>
      {!isPublicPage && (
        <>
          <ManageNode tableHead={tableHead} tableHeight={tableRef.current?.offsetHeight} />
          <ImportDrawer />
          <ImportStepsDrawer />
        </>
      )}
      <VerticalSpace size="large">
        <div
          id="container"
          className="content-datasheet"
          style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}
          ref={tableRef}
        >
          <VerticalButton columnWidth={columnWidth} />
          <Spin spinning={isLoading}>
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
          </Spin>
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
