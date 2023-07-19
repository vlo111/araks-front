import { Form, Table } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { Button } from 'components/button';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { ImportMappingSelect } from 'components/select/import-mapping-select';
import { useState } from 'react';

interface Item {
  key: string;
  dataFields: string;
  importedFields?: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  disabled: boolean;
  inputType: 'select' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  disabled = false,
  ...restProps
}) => {
  const inputNode = inputType === 'select' ? <ImportMappingSelect /> : <Input disabled={disabled} />;

  return (
    <td {...restProps}>
      {editing ? (
        <FormItem
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </FormItem>
      ) : (
        children
      )}
    </td>
  );
};

export const ImportMappingTable = () => {
  const [form] = Form.useForm();
  const { nodeTypeId } = useDataSheetWrapper();
  const [rowData, setRowData] = useState<Item[]>();

  useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: (data) => {
      setRowData(data.map((item) => ({ dataFields: item.name, key: item.id })));
    },
  });

  // eslint-disable-next-line no-console
  console.log('data', rowData);

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      // eslint-disable-next-line no-console
      console.log('row', row);
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Data schema fields',
      dataIndex: 'dataFields',
      width: '25%',
    },
    {
      title: 'Imported fields',
      dataIndex: 'importedFields',
      width: '25%',
      editable: true,
    },
    {
      title: 'Matching process',
      dataIndex: 'operation',
      render: (_: unknown, record: Item) => {
        return (
          <Button onClick={() => save(record.key)} type="primary">
            Check
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'importedFields' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={rowData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};
