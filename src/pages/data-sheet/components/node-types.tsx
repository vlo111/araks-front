import { Skeleton } from 'antd';
import { EventDataNode } from 'antd/es/tree';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropsSetState, TableStyleBasedOnTab, TreeNodeType } from '../types';
import { GET_PROJECT_NODE_TYPES_LIST, useGetProjectNoteTypes } from 'api/project-node-types/use-get-project-note-types';
import { useParams } from 'react-router-dom';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { DataSheetActionKind } from 'components/layouts/components/data-sheet/hooks/data-sheet-manage';
import { NodeTypesView } from './node-types-view';
import { useCallback } from 'react';

type Props = PropsSetState & TableStyleBasedOnTab;

export const NodeTypes = ({ searchVisible, setSearchVisible, isCheckable = false, noColors = false }: Props) => {
  const params = useParams();
  const { selectNodeType, color, nodeTypeId, selectNodeTypeFinished, allTypeSelected, dispatch } =
    useDataSheetWrapper();

  const {
    formatted: nodesList,
    isInitialLoading,
    data,
  } = useGetProjectNoteTypes(
    {
      url: GET_PROJECT_NODE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!(params.id && !!selectNodeType && !allTypeSelected),
      onSuccess: (data) => {
        /** This condition sets selected fisr node type when first time enter to this page */
        /** WONT work wor all type as the data already exists */
        const nodesList = createNodesTree(data.data, noColors);
        if (data.data.length && !nodeTypeId) {
          selectNodeType?.({
            titleText: data.data[0].name,
            color: data.data[0].color,
            nodeTypeId: data.data[0].id,
            parentId: data.data[0].parent_id,
            selectNodeTypeFinished: true,
            nodesList,
            dataList: data.data,
          });
          return;
        }
        selectNodeType?.({
          selectNodeTypeFinished: true,
          nodesList,
        });
      },
    },
    noColors
  );

  const onSelect = useCallback(
    (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => {
      selectNodeType({
        titleText: e.node.name,
        color: e.node.color,
        nodeTypeId: e.node.id,
        parentId: e.node.parent_id,
        selectNodeTypeFinished: true,
        nodesList,
        dataList: data,
      });
    },
    [data, nodesList, selectNodeType]
  );

  const onCheck = useCallback(
    (checkedKeys: string[]) => {
      dispatch({
        type: DataSheetActionKind.ALL_DATA_TYPE_CHECK,
        payload: { allDataTypesList: checkedKeys as string[] },
      });
    },
    [dispatch]
  );

  return !selectNodeTypeFinished || isInitialLoading ? (
    <Skeleton />
  ) : (
    <NodeTypesView
      onSelect={onSelect}
      onCheck={onCheck}
      nodesList={nodesList}
      searchVisible={searchVisible}
      setSearchVisible={setSearchVisible}
      isCheckable={isCheckable}
      color={color}
      nodeTypeId={nodeTypeId}
    />
  );
};
