import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { GET_PROJECTS_LIST } from 'api/projects/use-get-projects';

import client from '../client';
import { CreateOverviewFormData, ProjectFullInfo, RequestType, RequestTypes } from 'api/types';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'helpers/constants';

export const URL_CREAT_PROJECT = '/projects/create'
export const URL_UPDATE_PROJECT = '/projects/update/:id'

export type ManageProjectUrlProp = string;

type ReturnData = {
  data: ProjectFullInfo;
}

type Response = UseMutationResult<ReturnData, CreateOverviewFormData>;
export const useManageProject = (url: ManageProjectUrlProp, type: RequestType = RequestTypes.Post) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation<Response, unknown, CreateOverviewFormData>(
    (values: CreateOverviewFormData) => client[type](url, values),
    {
      onSuccess: (data: Response, variables, context) => {
        console.log('onSuccess', data);
        queryClient.invalidateQueries(GET_PROJECTS_LIST);
        navigate(PATHS.PROJECT_OVERVIEW.replace(':id', data?.data?.data?.id || ''));
      },
    }
  );
  return mutation;
};
