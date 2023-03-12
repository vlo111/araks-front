import { Empty } from "antd"
import { Text } from "components/typography";
import styled from "styled-components";

const StyleEmptyList = styled(Empty)`
    margin: 0;
    background: #F2F2F2;
    box-shadow: 0px 3px 3px rgba(111, 111, 111, 0.1);

    .ant-empty-image {
        display: none;
    }

    .ant-empty-description {
        text-align: start;
        padding: 23px 71px;

        span {
            color: #C3C3C3;
        }
    }
`;

export const EmptyList = () => {
    return <StyleEmptyList
    description={
      <Text>This Schema is empty. Start by adding the first node type.</Text>
    }
  >
  </StyleEmptyList>
}