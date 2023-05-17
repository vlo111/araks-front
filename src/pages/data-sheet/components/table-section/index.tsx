import { Table } from 'antd';
import { useColumns } from './use-columns';
import { DataType } from './types';
import { useActions } from './table-actions';
import { getTableHeight } from './constants';
import { useEffect, useState } from 'react';
import { VerticalButton } from 'components/button/vertical-button';
import { ManageNode } from './node/manage-node';
import { useGetTypeNodes } from 'api/node/use-get-type-nodes';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';

const dataSource = (length: number): DataType[] =>
  [...Array(20 - length)].map((_, i) => ({
    key: i,
    column: 'operation',
  }));

export const TableSection = () => {
  const [columnWidth, setColumnWidth] = useState(0);
  const [tableHead, setTableHead] = useState(0);
  const [rowData, setRowData] = useState<DataType[]>(dataSource(0));

  const { nodeTypeId } = useDataSheetWrapper();
  const { data } = useGetTypeNodes(nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: (data) => {
      const rows = data.map((item) => item.nodes);
      // eslint-disable-next-line no-console
      console.log('data.nodes', rows);
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
      if (data && data.length) {
        summaryHeight += data.length * 60;
      }
      setTableHead(summaryHeight);
    }
  }, [columns.length, data]);

  return (
    <div style={{ position: 'relative' }}>
      <ManageNode tableHead={tableHead} />
      <div id="container" style={{ overflow: 'auto', width: '100%', height: getTableHeight }}>
        <VerticalButton columnWidth={columnWidth} />
        <Table
          id="node-table"
          size="large"
          bordered
          dataSource={rowData}
          columns={[...columns, ...actions]}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};
