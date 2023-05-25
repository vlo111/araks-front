import { useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

import client from '../../client';
import { useParams } from "react-router-dom";
import { GET_EDGES } from "./use-get-edges";

const URL_PROJECT_NODE_TYPES_DELETE = '/projects-edge-type/delete/:id';

export const useDeleteEdge = (options: UseQueryOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (edgeTypeId: string) => client.delete(URL_PROJECT_NODE_TYPES_DELETE.replace(':id', edgeTypeId)),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data);
      queryClient.invalidateQueries([GET_EDGES.replace(':project_id', params.id || '')]);
    },
  });
  return mutation;
};
