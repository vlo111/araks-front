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
