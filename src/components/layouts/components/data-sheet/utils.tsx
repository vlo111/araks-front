import { Badge } from "antd";
import { ProjectTreeReturnData } from "api/types";
import { TreeStructure, TreeStructureLabel } from "types/project";

export const createNodesTree = (nodesList: ProjectTreeReturnData[], parentId?: string) => {
    const list = [];
    for (let i = 0; i < nodesList.length; i += 1) {
        if ((nodesList[i].parent_id && parentId && nodesList[i].parent_id !== parentId) || (!parentId && nodesList[i].parent_id) || (parentId && !nodesList[i].parent_id)) {
            continue;
        }
        const key = `${nodesList[i].id}_${nodesList[i].color}`;
        const treeNode: TreeStructure = {
            title: <Badge color={nodesList[i].color} text={nodesList[i].name} />,
            key,
        };

        for (let j = 0; j < nodesList.length; j += 1) {
            treeNode.children = createNodesTree(nodesList, nodesList[i].id);
        }

        list.push(treeNode);
    }
    return list;
};

export const createNodesTreeLabel = (nodesList: ProjectTreeReturnData[], parentId?: string) => {
    const list = [];
    for (let i = 0; i < nodesList.length; i += 1) {
        if ((nodesList[i].parent_id && parentId && nodesList[i].parent_id !== parentId) || (!parentId && nodesList[i].parent_id) || (parentId && !nodesList[i].parent_id)) {
            continue;
        }
        const key = `${nodesList[i].id}_${nodesList[i].color}`;
        const treeNode: TreeStructureLabel = {
            label: nodesList[i].name,
            value: key,
        };

        for (let j = 0; j < nodesList.length; j += 1) {
            treeNode.children = createNodesTreeLabel(nodesList, nodesList[i].id);
        }

        list.push(treeNode);
    }
    return list;
};