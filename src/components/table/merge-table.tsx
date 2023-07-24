import React from 'react';
import { ItemMapping, MappingResult, useImport } from 'context/import-context';
import Table, { ColumnsType } from 'antd/es/table';

import './import-table.css';
import { Icon } from 'components/icon';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

export const MergeTable: React.FC = () => {
  const { state } = useImport();

  const columns: ColumnsType<ItemMapping> = [
    {
      title: 'Existing columns',
      dataIndex: 'dataFields',
      key: 'dataFields',
      width: 200,
      render: (_: unknown, record: ItemMapping, index: number) => {
        return <Text color={COLORS.PRIMARY.GRAY_DARK}>{record.dataFields}</Text>;
      },
    },
    {
      title: '',
      dataIndex: 'arrow',
      key: 'arrow',
      align: 'center',
      render: (_: unknown, record: ItemMapping, index: number) => <Icon icon="right-button" size={40} />,
    },
    {
      title: 'Imported columns',
      dataIndex: 'importedFields',
      key: 'importedFields',
      width: 200,
      render: (_: unknown, record: ItemMapping) => {
        return <Text color={COLORS.PRIMARY.GRAY_DARK}>{record.importedFields}</Text>;
      },
    },
  ];

  return (
    <Table
      className="merge-table"
      rowClassName="merge-table-row"
      dataSource={Object.values(state.mapping as MappingResult) as ItemMapping[]}
      columns={columns}
      pagination={false}
    />
  );
};
