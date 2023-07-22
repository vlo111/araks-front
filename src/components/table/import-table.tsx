import React, { useState } from 'react';
import { Table, Select, Button } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyTypes } from 'components/form/property/types';
import { useImport } from 'context/import-context';

const { Option } = Select;

interface Item {
  key: string;
  dataFields: string;
  importedFields?: string;
}

export const ImportTable: React.FC = () => {
  const { nodeTypeId } = useDataSheetWrapper();
  const { state } = useImport();

  const [rowData, setRowData] = useState<Item[]>();

  useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: (data) => {
      setRowData(
        data
          .filter(
            (row) =>
              row.ref_property_type_id !== PropertyTypes.IMAGE_URL &&
              row.ref_property_type_id !== PropertyTypes.Document
          )
          .map((item) => ({ dataFields: item.name, key: item.id }))
      );
    },
  });

  const columns = [
    {
      title: 'Data schema fields',
      dataIndex: 'dataFields',
      key: 'dataFields',
    },
    {
      title: 'Imported fields',
      dataIndex: 'importedFields',
      key: 'importedFields',
      render: (_: unknown, record: Item) => (
        <Select
          style={{ width: '100%' }}
          placeholder="Select"
          value={record.importedFields} // Bind the selected value to the state
          onChange={(value) => handleImportFieldChange(record, value)}
        >
          {state.columnRow?.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Matching process',
      dataIndex: 'check',
      key: 'check',
      render: (_: unknown, record: Item) => <Button onClick={() => handleCheckClick(record)}>Check</Button>,
    },
  ];

  const handleImportFieldChange = (record: Item, value: string) => {
    // Handle the select input change and update the record's importedFields value
    setRowData((prevData) =>
      prevData?.map((item) => (item.key === record.key ? { ...item, importedFields: value } : item))
    );
  };

  const handleCheckClick = (record: Item) => {
    // Handle the check button click logic here
    // eslint-disable-next-line no-console
    console.log('Checked value in row:', record);
  };

  return <Table dataSource={rowData} columns={columns} />;
};
