import { Badge, Space } from 'antd';
import { NodeEdgeTypesReturnData, ProjectTreeReturnData } from 'api/types';
import { Text } from 'components/typography';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import styled from 'styled-components';
import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { ReactComponent as ConnectionInverse } from 'components/icons/connection-inverse.svg';
import { ReactComponent as ConnectionOneDirection } from 'components/icons/connection-one-direction.svg';
import { COLORS } from 'helpers/constants';
import { EdgeDirection } from 'pages/data-sheet/components/connection-table/components/direction';

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

export function findConnectionChildrenProperties(arr: TreeConnectionType[], selectedValue: string) {
  for (const element of arr) {
    if (element.name === selectedValue) {
      return {
        ...element,
        depth: 1,
        isConnectionType: true,
        labelName: element.label,
        labelValue: element.name,
      };
    }
    if (element.children) {
      for (const child of element.children) {
        if (child.value === selectedValue) {
          return {
            ...child,
            depth: 2,
            isConnectionType: true,
            labelName: `${element.name}.${child.label}`,
            labelValue: element.name,
            name: child.label,
            labelHead: (
              <Space>
                <StyledBadge color={element.source.color} text={<Text>{element.source.name}</Text>} />
                <EdgeDirection data={element} />
                <StyledBadge color={element.target.color} text={<Text>{element.target.name}</Text>} />
              </Space>
            ),
          };
        }
        if (child.children) {
          for (const subChild of child.children) {
            if (subChild.value === selectedValue) {
              return {
                ...subChild,
                isConnectionType: true,
                depth: 3,
                labelName: `${element.name}.${child.label}.${subChild.name}`,
                labelHead: (
                  <Space>
                    <StyledBadge color={element.source.color} text={<Text>{element.source.name}</Text>} />
                    <EdgeDirection data={element} />
                    <StyledBadge color={element.target.color} text={<Text>{element.target.name}</Text>} />
                  </Space>
                ),
                labelValue: element.name,
              };
            }
          }
        }
      }
    }
  }
  return null;
}

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
        ...item,
        value: item.id,
        key: item.id,
      })),
      ...nodesList[i],
    };

    list.push(treeNode);
  }
  return list;
};

export const createQueriesConnectionTree = (dataList: NodeEdgeTypesReturnData[]) =>
  dataList.reduce((result: TreeConnectionType[], item: NodeEdgeTypesReturnData) => {
    const nameExists = result.findIndex((r) => r.label === item.name);

    if (nameExists !== -1) {
      const updatedNode = {
        ...result[nameExists],
        title: (
          <Space>
            <Connection />
            <Text>{`${item.name} (${result[nameExists].count + 1})`}</Text>
          </Space>
        ),
        count: result[nameExists].count + 1,
        children: [
          ...(result[nameExists].children || []),
          {
            label: `${item.source.name}-${item.target.name}`,
            value: item.id,
            key: item.id,
            id: item.id,
            parentName: item.name,
            children: item.properties?.map((itemChild) => ({
              label: <Text>{`${item.name}.${itemChild.name}`}</Text>,
              title: (
                <>
                  <Text color={COLORS.PRIMARY.GRAY}>{item.name}</Text>
                  <Text color={COLORS.PRIMARY.BLUE}>.{itemChild.name}</Text>
                </>
              ),
              ...itemChild,
              value: itemChild.id,
              key: itemChild.id,
            })),
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
      return result;
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
      value: item.name,
      key: item.name,
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
          children: item.properties?.map((itemChild) => ({
            label: <Text>{`${item.name}.${itemChild.name}`}</Text>,
            title: (
              <>
                <Text color={COLORS.PRIMARY.GRAY}>{item.name}</Text>
                <Text color={COLORS.PRIMARY.BLUE}>.{itemChild.name}</Text>
              </>
            ),
            ...itemChild,
            value: itemChild.id,
            key: itemChild.id,
          })),
        },
      ],
      ...item,
    });

    return result;
  }, [] as TreeConnectionType[]);

export const createConnectionTree = (dataList: NodeEdgeTypesReturnData[]) =>
  dataList.reduce((result: TreeConnectionType[], item: NodeEdgeTypesReturnData) => {
    const nameExists = result.findIndex((r) => r.label === item.name);
    if (nameExists !== -1) {
      const updatedNode = {
        ...result[nameExists],
        title: (
          <Space>
            <Connection />
            <Text>{`${item.name} (${result[nameExists].count + 1})`}</Text>
          </Space>
        ),
        count: result[nameExists].count + 1,
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
      return result;
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
      key: item.name,
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
