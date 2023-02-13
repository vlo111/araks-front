import { Button as Component } from "antd"
import { HeartOutlined } from '@ant-design/icons';
import styled from "styled-components"
import { COLORS } from "../../helpers/constants";

export const LikeButton = styled((props) => <Component children='LIKE PROJECT' type="primary" icon={<HeartOutlined />} {...props} />)`
    &.ant-btn-primary {
        :active {
            background: #E0E2E8;
            border: 1px solid ${COLORS.PRIMARY.BLUE};
            
            span {
                color: #001479;
            }
        }
    }
`;