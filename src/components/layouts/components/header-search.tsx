import { Badge, Space } from "antd"
import { HeaderProfile } from "components/header-profile"
import { Search } from "components/search"
import { ReactComponent as Bell } from '../../icons/bell.svg';

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
