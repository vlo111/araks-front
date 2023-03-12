import { Button } from "antd";
import styled from "styled-components";

export const AddType = styled(Button)`
    background: linear-gradient(179.75deg, rgba(35, 47, 106, 0.8) 0%, rgba(35, 47, 106, 0.6) 99.91%);
    box-shadow: 0px 4px 4px rgba(47, 57, 107, 0.49);
    backdrop-filter: blur(2px);
    border: none;
    border-radius: 0;
    text-align: start;
    padding: 13px 0 13px 71px;
    height: 56px;

    span {
        color: #ffffff;
    }

    &:hover {
        background: linear-gradient(179.75deg, rgba(0, 20, 121, 0.8) 0%, rgba(35, 47, 106, 0.6) 99.91%);

        span {
            color: #ffffff;
        }
    }
`;  