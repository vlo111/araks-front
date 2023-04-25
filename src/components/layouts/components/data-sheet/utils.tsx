import { Badge } from 'antd';
import { ProjectTreeReturnData } from 'api/types';
import { TreeNodeType } from 'pages/data-sheet/types';
import styled from 'styled-components';

const StyledBadge = styled(({ defaultProprtyId, ...props }) => <Badge {...props} />)`
  && {
    .ant-badge-status-dot {
      height: 16px;
      width: 16px;
    }
  }
`;

export const createNodesTree = (nodesList: ProjectTreeReturnData[], parentId?: string) => {
  const list = [];
  for (let i = 0; i < nodesList.length; i += 1) {
    if (
      (nodesList[i].parent_id && parentId && nodesList[i].parent_id !== parentId) ||
      (!parentId && nodesList[i].parent_id) ||
      (parentId && !nodesList[i].parent_id)
    ) {
      continue;
    }
    const defaultProprtyId = nodesList[i].properties?.find((item) => item.default_proprty === true)?.id || '';
    const key = nodesList[i].id;
    const treeNode: TreeNodeType = {
      title: <StyledBadge color={nodesList[i].color} text={nodesList[i].name} defaultProprtyId={defaultProprtyId} />,
      label: nodesList[i].name,
      value: key,
      key,
      ...nodesList[i],
    };

    for (let j = 0; j < nodesList.length; j += 1) {
      treeNode.children = createNodesTree(nodesList, nodesList[i].id);
    }

    list.push(treeNode);
  }
  return list;
};
