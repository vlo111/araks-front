import { IProjectType, IProjectTypeData } from "api/types";
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../client';
import { formattedTypes } from "../../components/layouts/components/schema/helpers/utils";
import { INode } from "../../components/layouts/components/schema/types";

export const GET_TYPES = '/projects/:project_id/node-types';

type GetProjectParam = {
  id?: string;
  projectId: string;
  url: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: IProjectTypeData;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
// type Result = UseQueryResult<IProjectTypeData> & { nodes: INode[] };
type Result = { nodes: INode[] };

export const useGetTypes = (
  { url, ...params }: GetProjectParam,
  options: Options = { enabled: true }
): Result => {
  const urlNodes = url.replace(':project_id', params?.projectId || '');
  const result = useQuery({
    queryKey: [urlNodes, params],
    queryFn: () => client.get(urlNodes, { params }),
    ...options,
  });
  const { data, isSuccess } = result;

  const types = isSuccess ? data.data.projectsNodeTypes : ({} as IProjectType[])

  const nodes = isSuccess ? formattedTypes(types) : ({} as INode[])

  return {
    nodes
  } as Result;
};
