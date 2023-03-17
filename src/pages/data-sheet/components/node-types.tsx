import { SelectProps, Tree } from "antd";
import { EventDataNode } from "antd/es/tree";
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";
import styled from "styled-components";
import { TreeStructure } from "types/project";
import { PropsSetState, TreeNodeType } from "../types";

const StyledTree = styled(({color, ...props}) => <Tree {...props} />)`
  &&{
    background-color: transparent;
/* 
    .ant-tree-list-holder {
      padding: 0 16px;
    } */

    .ant-tree-treenode {
      padding: 0 24px;

      .ant-tree-node-content-wrapper {
        &:hover {
          background-color: transparent;
        }
      }
    }

    .ant-tree-treenode-selected {
      background-color: ${props => `${props.color}20`};

      .ant-tree-node-selected {

        background-color: transparent;
        .ant-badge-status-text {
          font-weight: 700;
        }
      }
    }
  }
`;

export const NodeTypes = ({ visible, setVisible }: PropsSetState) => {
  const { nodesList, selectNodeType, color } = useDataSheetWrapper();
    const onSelect = (selectedKeys: string[], e: {selected: boolean, node: EventDataNode<TreeNodeType>}) => {
      console.log('event', e);
        // setColor(selectedKeys[0]?.split('_')[1]);
        selectNodeType({titleText: e.node.name, color: e.node.color, projectId: e.node.id });
    };

    console.log('ssss', nodesList)
    
    return <StyledTree
        onSelect={onSelect}
        treeData={nodesList}
        blockNode
        style={!visible ? { display: 'none' } : {}}
        color={color}
    />
}