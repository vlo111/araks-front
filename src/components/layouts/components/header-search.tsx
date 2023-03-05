import { Badge as BadgeComponent, Space } from "antd"
import { HeaderProfile } from "components/header-profile"
import { Search } from "components/search"
import styled from "styled-components";
import { ReactComponent as Bell } from '../../icons/bell.svg';

const Badge = styled(BadgeComponent)`
    .ant-badge-dot {
        background: #F97070;
        box-shadow: 0px 3px 6px rgba(249, 112, 112, 0.7);
        width: 15px;
        height: 15px;
    }
`;

export const HeaderSearch = () => {
    return <Space size={32}>
        <Search />
        <div style={{ height: '41px' }}>
            <Badge color="#F97070" dot offset={[-5, 10]}>
                <Bell />
            </Badge>
        </div>
        <HeaderProfile />
    </Space>
}
