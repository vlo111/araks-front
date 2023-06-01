import { ProjectTypePropertyReturnData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST } from './use-get-projects-edge-type-properties';
import { NodeEdgeTypePropertiesSubmit } from 'types/node-edge-types';
import { errorMessage } from 'helpers/utils';

export type MoveProjectToAllFormData = {
  projectId: string;
};

const URL_PROJECT_EDGE_TYPE_PROPERTY_CREATE = '/edge-type-property/create';
const URL_PROJECT_EDGE_TYPE_PROPERTY_UPDATE = '/edge-type-property/update/:id';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<NodeEdgeTypePropertiesSubmit, Error, ReturnData>;

export const useManageProjectNodeTypeProperty = (options?: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, NodeEdgeTypePropertiesSubmit>({
    mutationFn: (values: NodeEdgeTypePropertiesSubmit) => {
      const url = values.propertyId
        ? URL_PROJECT_EDGE_TYPE_PROPERTY_UPDATE.replace(':id', values.propertyId || '')
        : URL_PROJECT_EDGE_TYPE_PROPERTY_CREATE;
      const type = values.propertyId ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
      };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', data.data.project_type_id || ''),
      ]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
