import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { GET_PROJECTS_LIST } from 'api/projects/use-get-projects';

import client from '../client';
import { CreateOverviewFormData, ProjectFullInfo, RequestType, RequestTypes } from 'api/types';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'helpers/constants';
import { GET_PROJECT_DATA } from './use-get-project';
import { GET_PROJECT_INFO_DATA } from './use-get-project-info';

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
        queryClient.invalidateQueries([GET_PROJECTS_LIST]);
        queryClient.invalidateQueries([GET_PROJECT_DATA.replace(':id', data?.data?.data?.id || '')]);
        queryClient.invalidateQueries([GET_PROJECT_INFO_DATA.replace(':id', data?.data?.data?.id || '')]);
        navigate(PATHS.PROJECT_OVERVIEW.replace(':id', data?.data?.data?.id || ''));
      },
    }
  );
  return mutation;
};
