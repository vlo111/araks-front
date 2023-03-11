import { Col, Row as RowComponent } from "antd"
import { Share } from "pages/project-overview/share";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

const Row = styled(({hasProject, ...props}) => <RowComponent {...props} />)`
    &.overview {
        height: calc(100vh - 152px);

        .ant-col.overview__section {
            background: #F7F7F7;

            opacity: ${props => props.hasProject ? 1 : 0.2};
            box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);

            &:first-child {
                opacity: 1;
                box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
            }

            &.project-save {
                padding: 32px 32px 40px;
            }
        }

        .overview-form-items {
            min-height: 80vh;
        }
    }
    
`;

export const OverviewWrapper = () => {
    const params = useParams();

    return <Row className="overview" hasProject={!!params.id}>
    <Col span={8} className='overview__section project-save'><Outlet /></Col>
    <Col span={8} className='overview__section project-share'><Share /></Col>
    <Col span={8} className='overview__section project-comments'></Col>
  </Row>
}