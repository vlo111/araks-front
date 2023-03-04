import { Spin } from "antd";
import useGetProject from "api/projects/use-get-project"
import { useParams } from "react-router-dom";

export const ProjectOverview = () => {
    const params = useParams();
    const { data, isLoading } = useGetProject({ id: params.id }, { enabled: !!params.id });
    return <Spin spinning={isLoading}>
        <div>
            Overview Page
        </div>
    </Spin>
}