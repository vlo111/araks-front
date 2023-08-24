import { UploadFile } from 'antd';
import { NodeEdgeTypesReturnData } from 'api/types';
import { TreeNodeType } from './types';

export function filterTreeData(data: TreeNodeType[], searchText: string): TreeNodeType[] {
  return data
    .map((node) => {
      // Clone the node object to avoid modifying the original data
      const clonedNode = { ...node };

      if (clonedNode.name.toLowerCase().includes(searchText)) {
        // The node matches the search text, so keep it and filter its children recursively
        if (clonedNode.children) {
          clonedNode.children = filterTreeData(clonedNode.children as TreeNodeType[], searchText);
        }
        return clonedNode;
      } else if (clonedNode.children) {
        // The node does not match the search text, so filter its children recursively
        const filteredChildren = filterTreeData(clonedNode.children as TreeNodeType[], searchText);
        if (filteredChildren.length > 0) {
          clonedNode.children = filteredChildren;
          return clonedNode;
        }
      }

      // The node and its children do not match the search text, so exclude it from the filtered data
      return null;
    })
    .filter((node) => node !== null) as TreeNodeType[];
}

export function filterConnectionTreeData(
  data: NodeEdgeTypesReturnData[],
  searchText: string
): NodeEdgeTypesReturnData[] {
  return data
    .map((node) => {
      // Clone the node object to avoid modifying the original data
      const clonedNode = { ...node };

      if (
        clonedNode.name.toLowerCase().includes(searchText) ||
        clonedNode.source.name.toLowerCase().includes(searchText) ||
        clonedNode.target.name.toLowerCase().includes(searchText)
      ) {
        return clonedNode;
      }

      // The node and its children do not match the search text, so exclude it from the filtered data
      return null;
    })
    .filter((node) => node !== null) as NodeEdgeTypesReturnData[];
}

export const setUploadFileStructure = (url: string, name = 'Default image') =>
  ({
    url: url,
    name: name,
    response: { data: { uploadPath: url, originalFileName: name } },
  } as UploadFile);
