import { Col, Row as RowComponent } from "antd"
import { useIsXXlScreen } from "hooks/use-breakpoint";
import styled from "styled-components";
import { LeftSection } from "./components/left-section";
import { RightSection } from "./components/right-section";


const Row = styled((props) => <RowComponent {...props} />)`
    &.overview {
        height: calc(100vh - 152px);

        .ant-col.overview__section {
            background: #F7F7F7;

            box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);

            &:first-child {
                opacity: 1;
                box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
            }
        }

        .overview-form-items {
            min-height: 80vh;
        }
    }
    
`;

export const DataSheet = () => {
    const isXXL = useIsXXlScreen();
    return <Row className="overview">
    <Col span={isXXL ? 4 : 6} className='overview__section project-save'><LeftSection /></Col>
    <Col span={isXXL ? 20 : 18} className='overview__section project-share'><RightSection /></Col>
  </Row>
}