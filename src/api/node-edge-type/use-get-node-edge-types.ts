import { NodeEdgeTypesReturnData } from 'api/types';
import { createConnectionTree } from 'components/layouts/components/data-sheet/utils';
import { TreeConnectionType } from 'pages/data-sheet/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { useMemo } from 'react';

export const URL_GET_NODE_EDGE_TYPES_LIST = '/projects-edge-type/:project_id';

type GetProjectParam = {
  id?: string;
  projectId: string;
  url: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: NodeEdgeTypesReturnData[];
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<NodeEdgeTypesReturnData[]> & { formatted: TreeConnectionType[] };

export const useGetNodeEdgeTypes = (
  { url, ...params }: GetProjectParam,
  options: Options = { enabled: true }
): Result => {
  const urlNodes = url.replace(':id', params?.id || '').replace(':project_id', params?.projectId || '');
  const result = useQuery({
    queryKey: [urlNodes, params],
    queryFn: () => client.get(urlNodes, { params }),
    ...options,
  });
  const { data, isSuccess } = result;

  const formatted = useMemo(() => (isSuccess ? createConnectionTree(data.data) : []), [data?.data, isSuccess]);
  return {
    ...result,
    data: isSuccess ? data.data : ([] as NodeEdgeTypesReturnData[]),
    formatted,
  } as Result;
};
