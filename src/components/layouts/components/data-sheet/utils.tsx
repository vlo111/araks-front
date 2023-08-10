import { Badge, Space } from 'antd';
import { NodeEdgeTypesReturnData, ProjectTreeReturnData } from 'api/types';
import { Text } from 'components/typography';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import styled from 'styled-components';
import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { ReactComponent as ConnectionInverse } from 'components/icons/connection-inverse.svg';
import { ReactComponent as ConnectionOneDirection } from 'components/icons/connection-one-direction.svg';
import { COLORS } from 'helpers/constants';

const StyledBadge = styled(({ defaultProprtyId, ...props }) => <Badge {...props} />)`
  && {
    .ant-badge-status-dot {
      height: 16px;
      width: 16px;
    }
  }
`;

export const createNodesTree = (nodesList: ProjectTreeReturnData[], noColors = false, parentId?: string) => {
  const list = [];
  for (let i = 0; i < nodesList.length; i += 1) {
    if (
      (nodesList[i].parent_id && parentId && nodesList[i].parent_id !== parentId) ||
      (!parentId && nodesList[i].parent_id) ||
      (parentId && !nodesList[i].parent_id)
    ) {
      continue;
    }
    const defaultProprtyId = nodesList[i].properties?.find((item) => item.default_property === true)?.id || '';
    const key = nodesList[i].id;
    const treeNode: TreeNodeType = {
      title: noColors ? (
        <Text>{nodesList[i].name}</Text>
      ) : (
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
      treeNode.children = createNodesTree(nodesList, noColors, nodesList[i].id);
    }

    list.push(treeNode);
  }
  return list;
};

export const createQueriesNodesTree = (nodesList: ProjectTreeReturnData[], noColors = false, parentId?: string) => {
  const list = [];
  for (let i = 0; i < nodesList.length; i += 1) {
    const defaultProprtyId = nodesList[i].properties?.find((item) => item.default_property === true)?.id || '';
    const key = nodesList[i].id;
    const treeNode: TreeNodeType = {
      title: noColors ? (
        <Text>{nodesList[i].name}</Text>
      ) : (
        <StyledBadge
          color={nodesList[i].color}
          text={<Text>{nodesList[i].name}</Text>}
          defaultProprtyId={defaultProprtyId}
        />
      ),
      label: nodesList[i].name,
      value: key,
      disabled: true,
      key,
      children: nodesList[i].properties?.map((item) => ({
        label: item.name,
        color: nodesList[i].color,
        title: (
          <>
            <Text color={COLORS.PRIMARY.GRAY}>{nodesList[i].name}</Text>
            <Text color={COLORS.PRIMARY.BLUE}>.{item.name}</Text>
          </>
        ),
        value: item.id,
        key: item.id,
      })),
      ...nodesList[i],
    };

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
            label: `${item.source.name}-${item.target.name}`,
            value: item.id,
            key: item.id,
            id: item.id,
            parentName: item.name,
            title: (
              <Space>
                <Text>{item.source.name}</Text>
                {item.inverse === true ? <ConnectionInverse /> : <ConnectionOneDirection />}
                <Text>{item.target.name}</Text>
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
      disabled: true,
      value: item.id,
      key: `${item.id}-${item.id}`,
      selectable: false,
      children: [
        {
          label: `${item.source.name}-${item.target.name}`,
          title: (
            <Space>
              <Text>{item.source.name}</Text>
              {item.inverse === true ? <ConnectionInverse /> : <ConnectionOneDirection />}
              <Text>{item.target.name}</Text>
            </Space>
          ),
          value: item.id,
          key: item.id,
          id: item.id,
          parentName: item.name,
        },
      ],
      ...item,
    });

    return result;
  }, [] as TreeConnectionType[]);
