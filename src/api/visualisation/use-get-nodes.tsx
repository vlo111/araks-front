import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import client from '../client';

interface EdgeType {
  id: string;
  name: string;
  color: string;
}

type AllDataResponse = {
  id: string;
  default_image: string;
  name: string;
  nodeType: EdgeType;
  project_id: string;
  project_type_id: string;
  updated_at: string;
};

type AllDataListResponse = {
  count: number;
  rows: AllDataResponse[];
};

export type Nodes = AllDataResponse[]

type ReturnData = {
  data: AllDataListResponse[];
};

type Options = UseQueryOptions<ReturnData[], Error, AllDataListResponse>;

type Result = {
  isInitialLoading: boolean,
  nodes: Nodes
}

const req_param = {
  page: 1,
  size: 100,
  sortField: 'updated_at',
  sortOrder: 'DESC',
  search: '',
  project_type_list_id: []
}

const URL_GET_NODES = '/nodes/all-data/:project_id';

export const useGetNodes = (options?: Options): Result => {
  const params = useParams();
  const urlNodes = URL_GET_NODES.replace(':project_id', params.id || '');
  const result = useQuery({
    queryKey: [urlNodes, req_param],
    queryFn: () => client.post(urlNodes, req_param).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    isInitialLoading: result.isInitialLoading,
    nodes: (isSuccess ? data.rows : []) as Nodes
  }
};
