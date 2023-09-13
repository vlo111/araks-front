import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AllDataDocumentListResponse, AllDataDocumentResponse } from 'types/node';
import client from '../client';
import { VISUALIZATION_URL } from './constants';
import { VisualizationSubmitType } from './types';
import { Edges, Nodes } from '../visualisation/use-get-data';

type ProjectEdgeResponse = {
  nodes: Nodes;
  edges: Edges;
};

export type GetNeo4jData = {
  data: ProjectEdgeResponse;
  rows: AllDataDocumentResponse[];
  count: number;
};

type QueryResponse = {
  data: GetNeo4jData;
};

type Options = UseQueryOptions<QueryResponse, Error, GetNeo4jData>;

type Result = UseQueryResult<AllDataDocumentListResponse> & {
  data: ProjectEdgeResponse;
  rowsData: AllDataDocumentResponse[];
  count: number;
};

export const useQueriesVisualization = (body: VisualizationSubmitType, options?: Options): Result => {
  const params = useParams();
  const urlNodes = VISUALIZATION_URL.replace(':project_id', params.id || '');
  const result = useQuery({
    queryKey: [urlNodes, body],
    queryFn: () => client.post(urlNodes, body).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: (isSuccess ? data : {}) as AllDataDocumentListResponse,
    rowsData: (isSuccess ? data.rows || [] : []) as AllDataDocumentResponse[],
    count: (isSuccess ? data.count : 0) as number,
  } as Result;
};
