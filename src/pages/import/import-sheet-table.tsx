import { Table } from 'antd';
import { useImport } from 'context/import-context';

type Props = {
  activeTab: string;
};

// const createDraftColumns = (count: number) => [
//   {
//     title: 'N',
//     dataIndex: 'rowNumber',
//     key: 'rowNumber',
//     render: (text: unknown, record: unknown, index: number) => {
//       return index + 1;
//     },
//   },
//   ...[...Array(count)].map((_, i) => ({
//     title: 'None',
//     key: i,
//     dataIndex: `import${i}`,
//   })),
// ];

export const ImportSheetTable = ({ activeTab }: Props) => {
  const { state } = useImport();
  // eslint-disable-next-line no-console
  console.log('state', state);

  return (
    <Table
      dataSource={state.dataSource}
      columns={state.columns}
      tableLayout="fixed"
      scroll={{ x: 'max-content' }}
      pagination={false}
    />
  );
};
