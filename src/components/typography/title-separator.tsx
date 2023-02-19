import { Divider as DividerComponent, Typography, Pagination as PaginationComponent, Space, PaginationProps } from "antd";
import styled from "styled-components";
import { COLORS } from "../../helpers/constants";

const { Text: TextComponent } = Typography;

const Divider = styled(DividerComponent)`
    background-color: ${COLORS.PRIMARY.GRAY_DARK};
    margin: 4px 0 24px 0;
`;

const Pagination = styled(PaginationComponent)`
    && {
        .ant-pagination-item-link {
            color: ${COLORS.PRIMARY.BLUE};
        }

        .ant-pagination-simple-pager input {
            background-color: transparent;
            border: none;
        }
    }
`;

const Text = styled(TextComponent)`
    && {
        font-family: 'Rajdhani';
        font-weight: 600;
        font-size: 24px;
        line-height: 31px;
        letter-spacing: 0.07em;
        color: ${COLORS.PRIMARY.GRAY_DARK};
        margin-left: 28px;
    }
`;

type Props = {
    name: string;
    paginationProps?: PaginationProps
}

export const TitleSeparator = ({ name, paginationProps }: Props) => <>
    <Space style={{display: 'flex', justifyContent: 'space-between'}}>
        <Text>{ name }</Text>
        {paginationProps && <Pagination simple { ...paginationProps } />}
    </Space>
    <Divider />
</>