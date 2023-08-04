import { Tree } from 'antd';
import styled from 'styled-components';

export const QueriesNodeTree = styled(({ color, ...props }) => <Tree {...props} />)`
  && {
    background-color: transparent;

    .ant-tree-treenode {
      .ant-tree-node-content-wrapper {
        &:hover {
          background-color: transparent;
        }
      }

      .ant-tree-checkbox-inner {
        width: 20px;
        height: 20px;
      }
    }

    .ant-tree-treenode-selected {
      background-color: ${(props) => `${props.color}20`};

      .ant-tree-node-selected {
        background-color: transparent;
        .ant-badge-status-text {
          font-weight: 700;
        }
      }
    }
  }
`;
