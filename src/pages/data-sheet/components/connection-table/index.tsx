import { useColumns } from './use-columns';
// import { VerticalButton } from 'components/button/vertical-button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { useEffect, useState } from 'react';
import { getTableHeight } from '../table-section/constants';
// import { ConnectionDataType } from '../table-section/types';
import { ConnectionTable } from 'components/table/connection-table';

const dataSource = [...Array(20)].map((_, i) => ({
  key: i,
  label: '',
}));

export const ConnectionTableSection = () => {
  const [tableHead, setTableHead] = useState(0);
  const columns = useColumns();

  useEffect(() => {
    if (columns.length) {
      setTableHead(document.querySelectorAll('.ant-table-thead')?.[0]?.clientHeight);
    }
  }, [columns.length]);

  return (
    <div id="container" style={{ overflow: 'auto', width: '100%', height: getTableHeight, position: 'relative' }}>
      {/* <VerticalButton /> */}
      <HorizontalButton tableHead={tableHead} />
      <ConnectionTable
        id="connection-table"
        size="large"
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
