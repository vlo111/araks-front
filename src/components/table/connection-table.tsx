import { Table } from 'antd';
import styled from 'styled-components';

export const ConnectionTable = styled(Table)`
  &&& {
    .ant-table-content {
      .ant-table-thead {
        .ant-table-cell.connection-first-column {
          padding: 0;

          &:before {
            width: 0;
            content: none;
          }
        }
      }

      .ant-table-tbody .fixed-border {
        box-shadow: 10px 0px 10px 0px rgba(111, 111, 111, 0.1);
      }
    }
  }
`;
