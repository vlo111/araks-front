import { Col, Row as RowComponent, Spin } from "antd";
import useGetProject from "api/projects/use-get-project"
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Row = styled(RowComponent)`
    height: 100vh;

    .ant-col {
        background: #F7F7F7;

        opacity: 0.2;
        box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);

        &:first-child {
            box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
        }

        
    }
`;

export const ProjectOverview = () => {
    const params = useParams();
    const { data, isLoading } = useGetProject({ id: params.id }, { enabled: !!params.id });
    return <Spin spinning={isLoading}>
        <Row>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
        </Row>
    </Spin>
}