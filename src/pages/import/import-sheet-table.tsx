import { Table } from 'antd';
import { useImport } from 'context/import-context';
import { useMemo } from 'react';
import { ExcelType } from './types';

type Props = {
  activeTab: string;
};

const createDraftColumns = (count: number) => [
  {
    title: 'N',
    dataIndex: 'rowNumber',
    key: 'rowNumber',
    render: (text: unknown, record: unknown, index: number) => {
      return index + 1;
    },
  },
  ...[...Array(count)].map((_, i) => ({
    title: 'None',
    dataIndex: `import${i}`,
  })),
];

export const ImportSheetTable = ({ activeTab }: Props) => {
  const { state } = useImport();
  // eslint-disable-next-line no-console
  console.log('state', state);

  const sheetData = useMemo(() => state?.data?.[+activeTab] as ExcelType, [activeTab, state?.data]);

  const columns = createDraftColumns(sheetData.data[0].length);

  return (
    <Table
      dataSource={state.dataSource}
      columns={columns}
      tableLayout="fixed"
      scroll={{ x: 'max-content' }}
      pagination={false}
    />
  );
};
