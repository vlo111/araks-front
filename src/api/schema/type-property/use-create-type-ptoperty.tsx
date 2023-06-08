import { ProjectTypePropertyReturnData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from 'api/client';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';
import { GET_TYPES } from '../type/use-get-types';
import { errorMessage } from "helpers/utils";

export const NODE_TYPE_PROPERTY_CREATE = `${process.env.REACT_APP_BASE_URL}node-type-property/create`;
const URL_PROJECT_NODE_TYPE_PROPERTY_CREATE = '/node-type-property/create';
const URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE = '/node-type-property/update/:id';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<ProjectNodeTypePropertySubmit, Error, ReturnData>;

export const useCreateTypeProperty = (options: Options, nodeTypePropertyId?: string) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation<ReturnData, unknown, ProjectNodeTypePropertySubmit >({
    mutationFn: (values: ProjectNodeTypePropertySubmit) => {
      const type = values.propertyId ? RequestTypes.Put : RequestTypes.Post;

      const url = values.propertyId
        ? URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE.replace(':id', values.propertyId || '')
        : URL_PROJECT_NODE_TYPE_PROPERTY_CREATE;

      const { propertyId, ...data } = values

      const body = {
        ...data,
        project_id: params.id,
      };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
