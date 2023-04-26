import { Badge, Space } from 'antd';
import { NodeEdgeTypesReturnData, ProjectTreeReturnData } from 'api/types';
import { Text } from 'components/typography';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import styled from 'styled-components';
import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { ReactComponent as ConnectionInverse } from 'components/icons/connection-inverse.svg';
import { ReactComponent as ConnectionOneDirection } from 'components/icons/connection-one-direction.svg';

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
      title: (
        <StyledBadge
          color={nodesList[i].color}
          text={<Text>{nodesList[i].name}</Text>}
          defaultProprtyId={defaultProprtyId}
        />
      ),
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

export const createConnectionTree = (dataList: NodeEdgeTypesReturnData[]) =>
  dataList.reduce((result: TreeConnectionType[], item: NodeEdgeTypesReturnData) => {
    const nameExists = result.findIndex((r) => r.label === item.name);
    if (nameExists !== -1) {
      const updatedNode = {
        ...result[nameExists],
        title: <Text>{`${item.name} (${result[nameExists].count + 1})`}</Text>,
        children: [
          ...(result[nameExists].children || []),
          {
            label: item.source_id,
            value: item.id,
            key: item.id,
            title: (
              <Space>
                <Text>{item.source_id}</Text>
                {item.properties.inverse === true ? <ConnectionInverse /> : <ConnectionOneDirection />}
                <Text>{item.target_id}</Text>
              </Space>
            ),
          },
        ],
      };
      result.splice(nameExists, 1, updatedNode);
    }

    result.push({
      label: item.name,
      count: 1,
      title: (
        <Space>
          <Connection />
          <Text>{`${item.name} (${1})`}</Text>
        </Space>
      ),
      value: item.id,
      key: `${item.id}-${item.id}`,
      selectable: false,
      children: [
        {
          label: item.source_id,
          title: (
            <Space>
              <Text>{item.source_id}</Text>
              {item.properties.inverse === true ? <ConnectionInverse /> : <ConnectionOneDirection />}
              <Text>{item.target_id}</Text>
            </Space>
          ),
          value: item.id,
          key: item.id,
        },
      ],
      ...item,
    });

    return result;
  }, [] as TreeConnectionType[]);
