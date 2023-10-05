import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import client from '../client';
import { VISUALIZATION_URL } from './constants';
import { VisualizationSubmitType } from './types';
import { Edges, Nodes } from '../visualisation/use-get-data';
import { errorMessage } from '../../helpers/utils';
type ProjectEdgeResponse = {
  count: number;
  nodes: Nodes;
  edges: Edges;
  relationsCounts: { [key: string]: number };
};
type Options = UseQueryOptions<VisualizationSubmitType, Error, ProjectEdgeResponse>;
export const useQueriesVisualization = (body: VisualizationSubmitType, options?: Options) => {
  const params = useParams();
  const urlNodes = VISUALIZATION_URL.replace(':project_id', params.id || '');
  const mutation = useMutation({
    mutationFn: () => client.post(urlNodes, body).then((data) => data.data),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
