import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import client from '../client';
import { EdgeTypePropertiesResponse } from './types';

export const GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/projects-edge-type/:edge_type_id/properties';
export const GET_PUBLIC_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/public/projects-edge-type/:edge_type_id/property';

type ReturnData = {
  data: EdgeTypePropertiesResponse;
};

type Options = UseQueryOptions<ReturnData, Error, EdgeTypePropertiesResponse>;
type Result = UseQueryResult<EdgeTypePropertiesResponse>;

export const useGetProjectsEdgeTypeProperties = (edgeypeId?: string, options?: Options): Result => {
  const isPublicPage = useIsPublicPage();

  const urlNodes = (
    isPublicPage ? GET_PUBLIC_PROJECT_EDGE_TYPE_PROPERTIES_LIST : GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST
  ).replace(':edge_type_id', edgeypeId || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as EdgeTypePropertiesResponse,
  } as Result;
};
