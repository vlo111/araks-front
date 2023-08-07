import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Table } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { useImport } from 'context/import-context';

const columns = [
  {
    title: 'Existing columns',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Existing rows',
    dataIndex: 'rows',
    key: 'rows',
  },
  {
    title: 'Imported columns',
    dataIndex: 'importedColumns',
    key: 'importedColumns',
  },
  {
    title: 'Imported Rows',
    dataIndex: 'importedRows',
    key: 'importedRows',
  },
  {
    title: 'Merged Rows',
    dataIndex: 'mergedRows',
    key: 'mergedRows',
  },
];

/**
 * @returns
 */
export const ImportMerge = () => {
  const { state } = useImport();

  return (
    <VerticalSpace size="large">
      <Row gutter={16}>
        <Col span={1}>
          <InfoCircleOutlined />
        </Col>
        <Col span={18}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={state.mergedData?.success}
            columns={columns}
            tableLayout="fixed"
            // scroll={{ x: 'max-content' }}
            bordered
            pagination={false}
          />
        </Col>
      </Row>
    </VerticalSpace>
  );
};
