import { Table } from 'antd';
import { LongTitle } from 'components/typography';
import { useImport } from 'context/import-context';
import { VARIABLES } from 'helpers/constants';
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

const createTableData = (data: Array<[string, string]>) => {
  return data.map((row) =>
    row.reduce((acc, item, index) => {
      return {
        ...acc,
        ...{
          [`import${index}`]:
            item && typeof item === 'string' && item.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH ? (
              <LongTitle style={{ maxWidth: '500px' }} className="button-content__text" name={item} />
            ) : (
              item
            ),
        },
      };
    }, [])
  );
};

export const ImportSheetTable = ({ activeTab }: Props) => {
  const { state } = useImport();

  const sheetData = useMemo(() => state?.data?.[+activeTab] as ExcelType, [activeTab, state?.data]);

  const dataTorWork = sheetData.data.slice(0, 6);

  const dataSource = createTableData(dataTorWork);

  const columns = createDraftColumns(sheetData.data[0].length);
  // eslint-disable-next-line no-console
  console.log('dataSource', dataSource);

  return <Table dataSource={dataSource} columns={columns} tableLayout="fixed" scroll={{ x: 'max-content' }} />;
};
