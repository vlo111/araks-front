import { Table } from 'antd';
import { useColumns } from './use-columns';
import { DataType } from './types';
import styled from 'styled-components';
import { useActions } from './table-actions';

interface EditableRowProps {
  index: number;
  className: string;
}

const EditableRow: React.FC<EditableRowProps> = (props) => {
  return <tr {...props} className={`${props.className} editable-row`} />;
};

interface EditableCellProps {
  children: React.ReactNode;
  className: string;
}

const EditableCell: React.FC<EditableCellProps> = ({ className, children, ...restProps }) => {
  return (
    <td {...restProps} className={`${className} editable-col`}>
      {children}
    </td>
  );
};

const dataSource: DataType[] = [...Array(20)].map((_, i) => ({
  key: i,
  column: 'operation',
}));

const TableStyled = styled((props) => <Table {...props} />)`
  && {
    .action-class {
      background-color: #fafafa;
      border-bottom: none;
    }
  }
`;

export const TableSection = () => {
  const columns = useColumns();
  const actions = useActions();

  const columnsAndAction = [...columns, ...actions];

  const components = {
    // header: {
    //   cell: HeaderCell,
    // },
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <TableStyled
      components={components}
      sticky
      rowClassName={() => 'editable-row'}
      dataSource={dataSource}
      // style={{ width: '10%' }}
      columns={columnsAndAction}
      pagination={false}
    />
  );
};
