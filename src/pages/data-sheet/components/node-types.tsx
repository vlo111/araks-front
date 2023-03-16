import { Tree } from "antd";
import type { DataNode, TreeProps } from 'antd/es/tree';
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";
import styled from "styled-components";
import { PropsSetState } from "../types";


const StyledTree = styled(props => <Tree {...props} />)`
  &&{
    background-color: transparent;

    .ant-tree-list-holder {
      padding: 0 16px;
    }

    .ant-tree-node-selected {
      background-color: transparent;

      .ant-badge-status-text {
        font-weight: 700;
      }
    }
  }
`;

export const NodeTypes = ({ visible, setVisible }: PropsSetState) => {
  const { nodesList, setColor } = useDataSheetWrapper();
    const onSelect = (selectedKeys: string[]) => {
        setColor(selectedKeys[0]?.split('_')[1]);
    };
    
    return <StyledTree
        onSelect={onSelect}
        treeData={nodesList}
        blockNode
        style={!visible ? { display: 'none' } : {}}
    />
}