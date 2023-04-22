import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {RequestTypes} from "../../types";
import client from "../../client";
import {ProjectEdgeResponse} from "../../../types/project-edge";

const URL_PROJECT_EDGE_CREATE = '/node-edge-type/create';

type ReturnData = {
    data: ProjectEdgeResponse;
};

export const useCreateEdge = () => {
    const params = useParams();

    const mutation = useMutation<ReturnData, unknown, ProjectEdgeResponse>({
        mutationFn: ({ ...values }: ProjectEdgeResponse) => {
            const body =  { ...values, project_id: params.id }
            return client[RequestTypes.Post](URL_PROJECT_EDGE_CREATE, body);
        }
    });
    return mutation;
};
