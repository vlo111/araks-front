import {
  GET_PROJECT_NODE_TYPES_LIST,
  GET_PUBLIC_PROJECT_NODE_TYPES_LIST,
  useGetProjectNoteTypes,
} from 'api/project-node-types/use-get-project-note-types';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { useParams } from 'react-router-dom';
import { updateTypeParentId } from 'helpers/utils';

export const useGetNodesList = () => {
  const isPublicPage = useIsPublicPage();
  const params = useParams();
  const { selectNodeType, nodeTypeId, allTypeSelected } = useDataSheetWrapper();
  useGetProjectNoteTypes(
    {
      url: isPublicPage ? GET_PUBLIC_PROJECT_NODE_TYPES_LIST : GET_PROJECT_NODE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!(params.id && !!selectNodeType && allTypeSelected),
      onSuccess: (data) => {
        /** This condition sets selected fisr node type when first time enter to this page */
        /** WONT work wor all type as the data already exists */

        updateTypeParentId(data.data);

        const nodesList = createNodesTree(data.data);
        if (data.data.length && !nodeTypeId) {
          selectNodeType?.({
            titleText: data.data[0].name,
            color: data.data[0].color,
            nodeTypeId: data.data[0].id,
            parentId: data.data[0].parent_id || '',
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
    }
  );
};
